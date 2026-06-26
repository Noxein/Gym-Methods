'use server'

import { sql } from "@vercel/postgres"
import { userID } from "./actions"
import { Trainee, TraineePlan, TraineesAndTrainings, TraineesWithoutPlans, TrainerPlanSchema, UserPurposeType, CustomExercise, CustomHandle } from "./types"
import { v4 } from "uuid"
import { revalidatePath } from "next/cache"
import { TraineePlanErrorChecker } from "./lib/utils"
import { getLocale } from "next-intl/server"
import { Locale } from "./i18n/config"
import { handleTypes } from "./lib/exercise-list"
import { formatTrainerTraineePlanDate, groupTrainerTraineePlanRows, type TrainerTraineePlanRow } from "./lib/trainerTraineePlans"

export const createNewSchema = async (plan: TrainerPlanSchema) => {
    const userid = await userID()
    const date = JSON.stringify(new Date())

    if(plan.name.trim() === '') {
        return { success: false, error: "SchemaNameCannotBeEmpty" }
    }
    if(plan.plan.some(plan => plan.exercises.length === 0)) {
        return { success: false, error: "ThereCantBeAnyEmptyTrainings" }
    }
    if(plan.plan.some(plan => plan.name.trim() === '')) {
        return { success: false, error: "AllTrainingsMustHaveAName" }
    }
    try{
        const response = await sql`
            INSERT INTO trainerplanschemas (id, trainerid, name, plan, lastedited) VALUES (${v4()}, ${userid}, ${plan.name}, ${JSON.stringify(plan.plan)}, ${date})

        `
        revalidatePath('/home/profile/my-trainees/schemas')
        return { success: true, error: null }
    }catch(error){
        console.error("Error creating new schema:", error);
        return { success: false, error: "Something went wrong" }
    }
}

export const updateSchema = async (plan: TrainerPlanSchema) => {
    const userid = await userID()
    const date = JSON.stringify(new Date())

    if(plan.name.trim() === '') {
        return { success: false, error: "SchemaNameCannotBeEmpty" }
    }
    if(plan.plan.some(plan => plan.exercises.length === 0)) {
        return { success: false, error: "ThereCantBeAnyEmptyTrainings" }
    }
    if(plan.plan.some(plan => plan.name.trim() === '')) {
        return { success: false, error: "AllTrainingsMustHaveAName" }
    }

    try{
        const response = await sql`
            UPDATE trainerplanschemas SET name = ${plan.name}, plan = ${JSON.stringify(plan.plan)}, lastedited = ${date} WHERE id = ${plan.id} AND trainerid = ${userid}
        `
        revalidatePath('/home/profile/my-trainees/schemas')
        return { success: true, error: null }
    }catch(error){
        console.error("Error updating schema:", error);
        return { success: false, error: "Something went wrong" }
    }
}

export const deleteSchemas = async (ids: string[]) => {
    const userid = await userID()

    try{
        const result = await sql.query(`
            DELETE FROM trainerplanschemas t
            USING UNNEST($1::uuid[]) AS ids(id)
            WHERE t.id = ids.id AND t.trainerid = $2
        `,[ids,userid])
        revalidatePath('/home/profile/my-trainees/schemas')
        return { success: true, error: null }
    }catch(error){
        console.error("Error deleting schemas:", error);
        return { success: false, error: "Something went wrong" }
    }
}

export const handleAddTrainingForTrainee = async (plan: TraineePlan, traineeid: string) => {
    const userid = await userID()
    const locale = await getLocale() as Locale

    const possibleError = TraineePlanErrorChecker(plan,locale)

    if(possibleError) {
        return { success: false, error: possibleError }
    }

    try{
        const motherPlanId = v4()
        const lastEdited = new Date()
        const normalizedSubPlans = plan.plan.map((singlePlan) => ({
            id: singlePlan.id,
            name: singlePlan.name,
            plan: singlePlan.exercises,
            date: formatTrainerTraineePlanDate(singlePlan.date),
            iscompleted: singlePlan.iscompleted,
        }))

        await sql.query(`
            WITH new_mother_plan AS (
                INSERT INTO "trainer-trainee-mother-plans" (id, trainerid, name)
                VALUES ($1::uuid, $2::uuid, $3::text)
                RETURNING id
            )
            INSERT INTO trainertraineeplans (id, trainerid, traineeid, name, plan, date, motherplanid, lastedited, iscompleted)
            SELECT child.id, $2::uuid, $4::uuid, child.name, child.plan, child.date::date, (SELECT id FROM new_mother_plan), $5::timestamptz, child.iscompleted
            FROM jsonb_to_recordset($6::jsonb) AS child(id uuid, name text, plan jsonb, date text, iscompleted boolean)
        `, [motherPlanId, userid, plan.name, traineeid, lastEdited.toISOString(), JSON.stringify(normalizedSubPlans)])

        revalidatePath('/home/profile/my-trainees')
        return { success: true, error: null }
    }
    catch(error){
        console.error("Error adding training for trainee:", error);
        return { success: false, error: "Something went wrong" }
    }
}

export const getTraineePlans = async (traineeid: string) => {
    const userid = await userID()

    try{
        const response = await sql`
                        SELECT t.*, mp.name AS motherplanname
                        FROM trainertraineeplans AS t
                        LEFT JOIN "trainer-trainee-mother-plans" AS mp ON mp.id = t.motherplanid
                        WHERE t.traineeid = ${traineeid}
                            AND t.trainerid = ${userid}
                            AND (
                                (t.motherplanid IS NOT NULL AND t.motherplanid IN (
                                        SELECT DISTINCT motherplanid
                                        FROM trainertraineeplans
                                        WHERE traineeid = ${traineeid}
                                            AND trainerid = ${userid}
                                            AND iscompleted = false
                                            AND motherplanid IS NOT NULL
                                ))
                                OR (t.motherplanid IS NULL AND t.iscompleted = false)
                            )
                        ORDER BY t.lastedited DESC
        `

                return groupTrainerTraineePlanRows(response.rows as TraineePlan[])
    }    catch(error){
        console.error("Error fetching trainee plans:", error);
        return []
    }
}

export const updateManyTraineePlan = async (plans: TraineePlan[], plansIds: string[]) => {
    const userid = await userID()

    try{
        const selectedPlans = plans.filter((plan) => plansIds.includes(plan.id))
        const existingRowsResponse = await sql.query(
            `
                SELECT id, traineeid, motherplanid
                FROM trainertraineeplans
                WHERE trainerid = $1
                  AND (motherplanid = ANY($2::uuid[]) OR id = ANY($2::uuid[]))
            `,
            [userid, plansIds]
        )
        const existingRows = existingRowsResponse.rows as { id: string, traineeid: string, motherplanid: string | null }[]
        const lastEdited = new Date()

        for (const selectedPlan of selectedPlans) {
            const relatedRows = existingRows.filter((row) => row.motherplanid === selectedPlan.id || row.id === selectedPlan.id)
            const hasMotherPlanRows = relatedRows.some((row) => row.motherplanid === selectedPlan.id)

            if (!hasMotherPlanRows && relatedRows.some((row) => row.id === selectedPlan.id && row.motherplanid == null)) {
                await sql`
                    UPDATE trainertraineeplans
                    SET name = ${selectedPlan.name}, plan = ${JSON.stringify(selectedPlan.plan)}, lastedited = ${lastEdited.toISOString()}, iscompleted = ${selectedPlan.iscompleted}
                    WHERE id = ${selectedPlan.id} AND trainerid = ${userid}
                `
                continue
            }

            const traineeId = selectedPlan.traineeid ?? relatedRows[0]?.traineeid

            if (!traineeId) {
                return { success: false, error: "Something went wrong" }
            }

            const existingSubPlanIds = new Set(relatedRows.map((row) => row.id))

            for (const subPlan of selectedPlan.plan) {
                if (existingSubPlanIds.has(subPlan.id)) {
                    await sql`
                        UPDATE trainertraineeplans
                        SET name = ${subPlan.name},
                            plan = ${JSON.stringify(subPlan.exercises)},
                            date = ${formatTrainerTraineePlanDate(subPlan.date)},
                            lastedited = ${lastEdited.toISOString()},
                            iscompleted = ${subPlan.iscompleted}
                        WHERE id = ${subPlan.id} AND trainerid = ${userid}
                    `
                    continue
                }

                await sql`
                    INSERT INTO trainertraineeplans (id, trainerid, traineeid, name, plan, date, motherplanid, lastedited, iscompleted)
                    VALUES (${subPlan.id}, ${userid}, ${traineeId}, ${subPlan.name}, ${JSON.stringify(subPlan.exercises)}, ${formatTrainerTraineePlanDate(subPlan.date)}, ${selectedPlan.id}, ${lastEdited.toISOString()}, ${subPlan.iscompleted})
                `
            }
        }

        revalidatePath('/home/profile/my-trainees')
        return { success: true, error: null }

    }catch(error){
        console.error("Error updating trainee plans:", error);
        return { success: false, error: "Something went wrong" }
    }
}

export const getHomeScreenData = async () => {
    const userid = await userID()

    try{
        const traineesWithoutPlansResponse = await sql`
            SELECT gymusers.purpose, gymusers.username, gymusers.avatarurl, tt.*  FROM gymusers 
            INNER JOIN trainertrainee AS tt ON gymusers.id = tt.traineeid
            WHERE gymusers.id = tt.traineeid AND tt.trainerid = ${userid} AND NOT EXISTS (SELECT 1 FROM trainertraineeplans t WHERE t.traineeid = gymusers.id AND t.trainerid = ${userid} AND t.iscompleted = false)
        `
        const response = await sql`
            SELECT gymusers.purpose, gymusers.username, gymusers.avatarurl, tt.* , t.*, mp.name AS motherplanname FROM gymusers 
            INNER JOIN trainertrainee AS tt ON gymusers.id = tt.traineeid
            INNER JOIN trainertraineeplans AS t ON t.traineeid = gymusers.id AND t.trainerid = ${userid} AND t.iscompleted = false
            LEFT JOIN "trainer-trainee-mother-plans" AS mp ON mp.id = t.motherplanid
            WHERE gymusers.id = tt.traineeid AND tt.trainerid = ${userid} AND (
                (t.motherplanid IS NOT NULL AND t.motherplanid IN (
                    SELECT DISTINCT motherplanid
                    FROM trainertraineeplans
                    WHERE trainerid = ${userid}
                      AND traineeid = gymusers.id
                      AND iscompleted = false
                      AND motherplanid IS NOT NULL
                ))
                OR (t.motherplanid IS NULL AND t.iscompleted = false)
            ) ORDER BY t.lastedited DESC
        `
        let arrOfIds: string[] = []
        const skippedTrainingsCountByTrainee = new Map<string, number>()
        const groupedPlans = new Map<string, TraineesAndTrainings>()
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        response.rows.forEach(row => { 
            if(!arrOfIds.includes(row.traineeid)) arrOfIds.push(row.traineeid) 

            const rowDate = row.date ? new Date(row.date) : null
            const skippedInCurrentRow = !row.iscompleted && rowDate && !isNaN(rowDate.getTime()) && rowDate < today ? 1 : 0

            skippedTrainingsCountByTrainee.set(
                row.traineeid,
                (skippedTrainingsCountByTrainee.get(row.traineeid) || 0) + skippedInCurrentRow
            )

            const groupId = row.motherplanid ?? row.id
            const key = `${row.traineeid}:${groupId}`

            if (Array.isArray(row.plan) && (row.date === undefined || row.date === null) && row.motherplanid == null) {
                groupedPlans.set(key, {
                    ...(row as TraineesAndTrainings),
                    plan: groupTrainerTraineePlanRows([row as TrainerTraineePlanRow])[0]?.plan ?? [],
                    lastedited: new Date(row.lastedited),
                })
                return
            }

            const existingGroup = groupedPlans.get(key)
            const mappedSubPlan = groupTrainerTraineePlanRows([row as TrainerTraineePlanRow])[0]?.plan[0]

            if (!mappedSubPlan) return

            if (!existingGroup) {
                groupedPlans.set(key, {
                    purpose: row.purpose as UserPurposeType,
                    username: row.username,
                    avatarurl: row.avatarurl,
                    traineeid: row.traineeid,
                    trainerid: row.trainerid,
                    pairedat: row.pairedat,
                    id: groupId,
                    name: row.motherplanname ?? row.name,
                    plan: [mappedSubPlan],
                    lastedited: new Date(row.lastedited),
                    iscompleted: row.iscompleted,
                })
                return
            }

            existingGroup.plan.push(mappedSubPlan)
            existingGroup.iscompleted = existingGroup.iscompleted && mappedSubPlan.iscompleted

            if (new Date(existingGroup.lastedited).getTime() < new Date(row.lastedited).getTime()) {
                existingGroup.lastedited = new Date(row.lastedited)
            }
        })

        const newestTrainingByTrainee = new Map<string, TraineesAndTrainings>()

        Array.from(groupedPlans.values()).forEach((training) => {
            training.plan.sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime())

            const existingTraining = newestTrainingByTrainee.get(training.traineeid)

            if (!existingTraining || new Date(existingTraining.lastedited).getTime() < new Date(training.lastedited).getTime()) {
                newestTrainingByTrainee.set(training.traineeid, training)
            }
        })

        const mapConvertedToArray = Array.from(newestTrainingByTrainee.values()).map((training) => ({
            ...training,
            skippedtrainingscount: skippedTrainingsCountByTrainee.get(training.traineeid) || 0,
        }))

        return {trainings: mapConvertedToArray, traineesWithoutPlans: traineesWithoutPlansResponse.rows as TraineesWithoutPlans[], error: null, allTraineesIDs: arrOfIds, userid}
    }catch(error){
        console.error("Error fetching home screen data:", error);
        return {trainings: [], traineesWithoutPlans: [], allTraineesIDs: [], error: "Something went wrong"}  
    }
}


            // SELECT gymusers.purpose, gymusers.trainercurrentaccounttype, gymusers.username, t.*  FROM gymusers 
            // INNER JOIN trainertraineeplans AS t ON gymusers.id = t.trainerid 
            // INNER JOIN trainertrainee AS tt ON tt.traineeid = gymusers.id  WHERE gymusers.id = tt.trainerid AND t.iscompleted = false ORDER BY t.lastedited DESC
export const JoinTraining = async (trainingId: string) => {
    
    const userid = await userID()

    try {
        const response = await sql`
            SELECT t.*, mp.name AS motherplanname
            FROM trainertraineeplans AS t
            LEFT JOIN "trainer-trainee-mother-plans" AS mp ON mp.id = t.motherplanid
            WHERE trainerid = ${userid} AND (t.motherplanid = ${trainingId} OR t.id = ${trainingId})
        `

        if(response.rows.length === 0) throw new Error("Nie można znaleźć treningu o podanym ID")

        return {response: groupTrainerTraineePlanRows(response.rows as TraineePlan[])[0] ?? null, error: null}
    }catch(err) {
        const e = err as Error
        return {response: null, error: e.message}
    }

}

export const getTraineeIdByTrainingId = async (trainingId: string) => {
    try {
        const response = await sql`
            SELECT traineeid FROM trainertraineeplans WHERE motherplanid = ${trainingId} OR id = ${trainingId} LIMIT 1
        `
        if(response.rows.length === 0) throw new Error("Nie można znaleźć treningu o podanym ID")

        return {traineeId: response.rows[0].traineeid as string, error: null}
    }catch(err) {
        const e = err as Error
        return {traineeId: null, error: e.message}
    }
}

export const createCustomExercise = async (
    exerciseName: string,
    description?: string,
    category?: string,
    timeMesure: boolean = false,
    usesHandle: boolean = false
) => {
    const userid = await userID()

    if(typeof exerciseName !== 'string' || exerciseName.trim() === '') {
        return { success: false, error: "Exercise name is required" }
    }

    if(exerciseName.length > 255) {
        return { success: false, error: "Exercise name is too long" }
    }

    try {
        const existingExercise = await sql`
            SELECT id
            FROM trainer_custom_exercises
            WHERE trainer_id = ${userid}
              AND LOWER(TRIM(exercise_name)) = LOWER(${exerciseName.trim()})
            LIMIT 1
        `

        if(existingExercise.rows.length > 0) {
            return { success: false, error: "Exercise with this name already exist" }
        }

        const id = v4()
        const createdAt = new Date()
        
        await sql`
            INSERT INTO trainer_custom_exercises (id, trainer_id, exercise_name, description, category, created_at, time_measure, uses_handle) 
            VALUES (${id}, ${userid}, ${exerciseName.trim()}, ${description || null}, ${category || null}, ${JSON.stringify(createdAt)}, ${timeMesure}, ${usesHandle})
        `
        
        revalidatePath('/home/profile/my-trainees/schemas')
        return { success: true, error: null, id }
    } catch(error) {
        console.error("Error creating custom exercise:", error)
        return { success: false, error: "Something went wrong" }
    }
}

export const getTrainerCustomExercises = async () => {
    const userid = await userID()

    try {
        const response = await sql`
            SELECT id, trainer_id, exercise_name, description, category, created_at, uses_handle, time_measure 
            FROM trainer_custom_exercises 
            WHERE trainer_id = ${userid}
            ORDER BY created_at DESC
        `
        
        return response.rows as CustomExercise[]
    } catch(error) {
        console.error("Error fetching custom exercises:", error)
        return []
    }
}

export const deleteCustomExercise = async (exerciseId: string) => {
    const userid = await userID()

    if(typeof exerciseId !== 'string') {
        return { success: false, error: "Invalid exercise ID" }
    }

    try {
        const response = await sql`
            DELETE FROM trainer_custom_exercises 
            WHERE id = ${exerciseId} AND trainer_id = ${userid}
        `
        
        revalidatePath('/home/profile/my-trainees/schemas')
        return { success: true, error: null }
    } catch(error) {
        console.error("Error deleting custom exercise:", error)
        return { success: false, error: "Something went wrong" }
    }
}

export const updateCustomExercise = async (exerciseId: string, exerciseName: string, description?: string, category?: string) => {
    const userid = await userID()

    if(typeof exerciseId !== 'string') {
        return { success: false, error: "Invalid exercise ID" }
    }

    if(typeof exerciseName !== 'string' || exerciseName.trim() === '') {
        return { success: false, error: "Exercise name is required" }
    }

    if(exerciseName.length > 255) {
        return { success: false, error: "Exercise name is too long" }
    }

    try {
        await sql`
            UPDATE trainer_custom_exercises 
            SET exercise_name = ${exerciseName.trim()}, description = ${description || null}, category = ${category || null}
            WHERE id = ${exerciseId} AND trainer_id = ${userid}
        `
        
        revalidatePath('/home/profile/my-trainees/schemas')
        return { success: true, error: null }
    } catch(error) {
        console.error("Error updating custom exercise:", error)
        return { success: false, error: "Something went wrong" }
    }
}

export const isValidExerciseId = async (exerciseId: string) => {
    const userid = await userID()

    if(typeof exerciseId !== 'string') {
        return false
    }

    try {
        const response = await sql`
            SELECT id FROM trainer_custom_exercises 
            WHERE id = ${exerciseId} AND trainer_id = ${userid}
        `
        
        return response.rows.length > 0
    } catch(error) {
        console.error("Error validating exercise ID:", error)
        return false
    }
}

export const createTrainerCustomHandle = async (handleName: string) => {
    const userid = await userID()

    if(typeof handleName !== 'string' || handleName.trim() === '') {
        return { success: false, error: 'Name cant be empty' }
    }

    if(handleName.trim().length > 255) {
        return { success: false, error: 'Handle name is too long' }
    }

    try {
        const existingHandle = await sql`
            SELECT id
            FROM trainer_custom_handles
            WHERE trainer_id = ${userid}
              AND LOWER(TRIM(handle_name)) = LOWER(${handleName.trim()})
            LIMIT 1
        `

        if(existingHandle.rows.length > 0) {
            return { success: false, error: 'That handle already exists' }
        }

        const id = v4()
        const createdAt = new Date()

        await sql`
            INSERT INTO trainer_custom_handles (id, trainer_id, handle_name, created_at)
            VALUES (${id}, ${userid}, ${handleName.trim()}, ${JSON.stringify(createdAt)})
        `

        revalidatePath('/home/profile/my-trainees/handles')
        return { success: true, error: null, id }
    } catch(error) {
        console.error('Error creating trainer custom handle:', error)
        return { success: false, error: 'Something went wrong' }
    }
}

export const getTrainerCustomHandles = async () => {
    const userid = await userID()

    try {
        const response = await sql`
            SELECT id, trainer_id, handle_name, created_at
            FROM trainer_custom_handles
            WHERE trainer_id = ${userid}
            ORDER BY created_at DESC
        `

        return response.rows as CustomHandle[]
    } catch(error) {
        console.error('Error fetching trainer custom handles:', error)
        return []
    }
}

export const deleteTrainerCustomHandle = async (handleId: string) => {
    const userid = await userID()

    if(typeof handleId !== 'string' || handleId.trim() === '') {
        return { success: false, error: 'Handle id is needed' }
    }

    try {
        await sql`
            DELETE FROM trainer_custom_handles
            WHERE id = ${handleId} AND trainer_id = ${userid}
        `

        revalidatePath('/home/profile/my-trainees/handles')
        return { success: true, error: null }
    } catch(error) {
        console.error('Error deleting trainer custom handle:', error)
        return { success: false, error: 'Something went wrong' }
    }
}

export const getTrainerAllHandleTypes = async () => {
    const customHandles = await getTrainerCustomHandles()

    const normalizedCustomHandles = customHandles.map(handle => ({
        id: handle.id,
        handlename: handle.handle_name,
    }))

    const defaultHandles = handleTypes.map(handle => ({
        id: handle,
        handlename: handle,
    }))

    return [...normalizedCustomHandles, ...defaultHandles] as {id: string, handlename: string}[]
}