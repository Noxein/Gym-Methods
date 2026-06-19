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
        const response = await sql`
            INSERT INTO trainertraineeplans (id, trainerid, traineeid, name, plan, lastedited, iscompleted) VALUES (${v4()}, ${userid}, ${traineeid}, ${plan.name}, ${JSON.stringify(plan.plan)}, ${JSON.stringify(new Date())}, false)
        `
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
            SELECT * FROM trainertraineeplans WHERE traineeid = ${traineeid} AND trainerid = ${userid} ORDER BY lastedited DESC
        `
        return response.rows as TraineePlan[]
    }    catch(error){
        console.error("Error fetching trainee plans:", error);
        return []
    }
}

export const updateManyTraineePlan = async (plans: TraineePlan[], plansIds: string[]) => {
    const userid = await userID()

    const plansFilteredAndSorted = plans.filter(plan => plansIds.includes(plan.id)).sort((a,b)=> a.id.localeCompare(b.id))
    const idsSorted = plansIds.sort((a,b) => a.localeCompare(b))

    const mappedPlans = plansFilteredAndSorted.map(pln => JSON.stringify(pln.plan))

    try{

        const result = await sql.query(`
            UPDATE trainertraineeplans AS t
            SET plan = data.plan, lastedited = $4
            FROM UNNEST($1::json[], $2::uuid[]) AS data(plan, id)
            WHERE t.id = data.id AND t.trainerid = $3
        `,[mappedPlans, idsSorted, userid, JSON.stringify(new Date())])
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
            SELECT gymusers.purpose, gymusers.username, gymusers.avatarurl, tt.* , t.*  FROM gymusers 
            INNER JOIN trainertrainee AS tt ON gymusers.id = tt.traineeid
            INNER JOIN trainertraineeplans AS t ON t.traineeid = gymusers.id AND t.trainerid = ${userid} AND t.iscompleted = false
            WHERE gymusers.id = tt.traineeid AND tt.trainerid = ${userid} AND t.iscompleted = false ORDER BY t.lastedited DESC
        `
        let arrOfIds: string[] = []
        let oneNewestTrainingForEachTrainee:Map<string, TraineesAndTrainings> = new Map()
        const skippedTrainingsCountByTrainee = new Map<string, number>()
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        response.rows.forEach(row => { 
            if(!arrOfIds.includes(row.traineeid)) arrOfIds.push(row.traineeid) 

            const rowPlan = (row.plan || []) as { date: Date | string, iscompleted: boolean }[]
            const skippedInCurrentRow = rowPlan.filter((singleTraining) => {
                if (singleTraining.iscompleted) return false
                const trainingDate = new Date(singleTraining.date)
                return !isNaN(trainingDate.getTime()) && trainingDate < today
            }).length

            skippedTrainingsCountByTrainee.set(
                row.traineeid,
                (skippedTrainingsCountByTrainee.get(row.traineeid) || 0) + skippedInCurrentRow
            )

            if(!oneNewestTrainingForEachTrainee.has(row.traineeid)){
                oneNewestTrainingForEachTrainee.set(row.traineeid, row as TraineesAndTrainings)   
            }
            const training = oneNewestTrainingForEachTrainee.get(row.traineeid)

            if(!training) return
            
            if(training?.lastedited.getTime() < new Date().getTime()) return
            if(training?.lastedited.getTime() > row.lastedited.getTime()){
                oneNewestTrainingForEachTrainee.set(row.traineeid, row as TraineesAndTrainings) 
            }

        })
        const mapConvertedToArray = Array.from(oneNewestTrainingForEachTrainee.values()).map((training) => ({
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
            SELECT * FROM trainertraineeplans WHERE trainerid = ${userid} AND id = ${trainingId}
        `

        if(response.rows.length === 0) throw new Error("Nie można znaleźć treningu o podanym ID")

        return {response: response.rows[0] as TraineePlan, error: null}
    }catch(err) {
        const e = err as Error
        return {response: null, error: e.message}
    }

}

export const getTraineeIdByTrainingId = async (trainingId: string) => {
    try {
        const response = await sql`
            SELECT traineeid FROM trainertraineeplans WHERE id = ${trainingId}
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