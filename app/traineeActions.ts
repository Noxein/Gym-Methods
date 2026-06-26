'use server'

import { sql } from "@vercel/postgres"
import { userID } from "./actions"
import { Series, TraineePlan, TraineeSingleTraining } from "./types"
import { revalidatePath } from "next/cache"
import { formatTrainerTraineePlanDate, groupTrainerTraineePlanRows } from "./lib/trainerTraineePlans"

export const getTraineeTrainings = async () => {
    const userid = await userID()

    const response = await sql`
                SELECT t.*, mp.name AS motherplanname
                FROM trainertraineeplans AS t
                LEFT JOIN "trainer-trainee-mother-plans" AS mp ON mp.id = t.motherplanid
                WHERE t.traineeid = ${userid}
                    AND (
                        (t.motherplanid IS NOT NULL AND t.motherplanid IN (
                                SELECT DISTINCT motherplanid
                                FROM trainertraineeplans
                                WHERE traineeid = ${userid}
                                    AND iscompleted = false
                                    AND motherplanid IS NOT NULL
                        ))
                        OR (t.motherplanid IS NULL AND t.iscompleted = false)
                    )
                ORDER BY t.lastedited DESC
    `

        return groupTrainerTraineePlanRows(response.rows as TraineePlan[])
}

export const getTraineeTrainingById = async (trainingId: string) => {
    const userid = await userID()

    try {
        const response = await sql`
            SELECT t.*, mp.name AS motherplanname
            FROM trainertraineeplans AS t
            LEFT JOIN "trainer-trainee-mother-plans" AS mp ON mp.id = t.motherplanid
            WHERE (t.traineeid = ${userid} OR t.trainerid = ${userid}) AND (t.motherplanid = ${trainingId} OR t.id = ${trainingId}) 
        `

        if(response.rows.length === 0) throw new Error("Nie można znaleźć treningu o podanym ID")

        return {response: groupTrainerTraineePlanRows(response.rows as TraineePlan[])[0] ?? null, error: null}
    }catch(err) {
        console.log(err)
        const e = err as Error
        return {response: null, error: e.message}
    }
}

export const handleCloseTrainingSF = async (training: TraineePlan) => {
    const userid = await userID()
    const date = new Date()

    const latestCompletedTraining = training.plan
        .filter(item => item.iscompleted)
        .sort((a, b) => new Date(b.lastedited).getTime() - new Date(a.lastedited).getTime())[0]

    const hasMeaningfulSet = (set: { actual: Series, isSetCompleted: boolean | undefined }) => {
        if(typeof set.isSetCompleted === 'boolean') return true

        return (
            set.actual.weight > 0 ||
            set.actual.repeat > 0 ||
            (typeof set.actual.time === 'number' && set.actual.time > 0)
        )
    }

    const saveCompletedTrainingExercises = async (singleTraining: TraineeSingleTraining) => {
        const rowsToInsert = singleTraining.exercises
            .map(exercise => {
                const actualSets = exercise.sets
                    .filter(hasMeaningfulSet)
                    .map(set => set.actual)

                if(actualSets.length === 0) return null

                return {
                    exerciseid: exercise.exerciseid,
                    exercisename: exercise.exercisename,
                    sets: actualSets,
                    handleid: exercise.handle?.id ?? null,
                    handlename: exercise.handle?.handlename ?? null,
                }
            })
            .filter((row): row is {
                exerciseid: string,
                exercisename: string,
                sets: Series[],
                handleid: string | null,
                handlename: string | null,
            } => row !== null)

        await Promise.all(rowsToInsert.map(async row => {
            await sql`
                INSERT INTO gymexercises (userid, exerciseid, date, sets, ispartoftraining, trainingid, exercisename, handleid, handlename, parenttrainingplan)
                VALUES (${userid}, ${row.exerciseid}, ${JSON.stringify(date)}, ${JSON.stringify(row.sets)}, ${true}, ${null}, ${row.exercisename}, ${row.handleid}, ${row.handlename}, ${training.id})
            `
        }))
    }

    try{
        if(latestCompletedTraining) {
            await saveCompletedTrainingExercises(latestCompletedTraining)
        }

        for (const singleTraining of training.plan) {
            await sql`
                UPDATE trainertraineeplans
                SET plan = ${JSON.stringify(singleTraining.exercises)},
                    iscompleted = ${singleTraining.iscompleted},
                    lastedited = ${date.toISOString()},
                    date = ${formatTrainerTraineePlanDate(singleTraining.date)},
                    name = ${singleTraining.name}
                WHERE traineeid = ${userid} AND id = ${singleTraining.id}
            `
        }

        return {response: training, error: null}
    }catch(err){
        const e = err as Error
        return {response: null, error: e.message}
    }finally{
        revalidatePath('/home')
    }
}