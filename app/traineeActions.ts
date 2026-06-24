'use server'

import { sql } from "@vercel/postgres"
import { userID } from "./actions"
import { Series, TraineePlan, TraineeSingleTraining } from "./types"
import { revalidatePath } from "next/cache"

export const getTraineeTrainings = async () => {
    const userid = await userID()

    const response = await sql`
        SELECT * FROM trainertraineeplans WHERE traineeid = ${userid} AND iscompleted = false ORDER BY lastedited DESC
    `

    console.log(response.rows)

    return response.rows as TraineePlan[]
}

export const getTraineeTrainingById = async (trainingId: string) => {
    const userid = await userID()

    try {
        const response = await sql`
            SELECT * FROM trainertraineeplans WHERE (traineeid = ${userid} OR trainerid = ${userid}) AND id = ${trainingId} 
        `

        if(response.rows.length === 0) throw new Error("Nie można znaleźć treningu o podanym ID")

        return {response: response.rows[0] as TraineePlan, error: null}
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

        const response = await sql`
            UPDATE trainertraineeplans SET plan = ${JSON.stringify(training.plan)}, iscompleted = ${training.iscompleted}, lastedited = ${JSON.stringify(date)} WHERE traineeid = ${userid} AND id = ${training.id} RETURNING *
        `

        if(response.rows.length === 0) throw new Error("Nie można znaleźć treningu o podanym ID")

        return {response: response.rows[0] as TraineePlan, error: null}
    }catch(err){
        const e = err as Error
        return {response: null, error: e.message}
    }finally{
        revalidatePath('/home')
    }
}