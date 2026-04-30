'use server'

import { sql } from "@vercel/postgres"
import { userID } from "./actions"
import { Trainee, TraineePlan, TraineesAndTrainings, TraineesWithoutPlans, TrainerPlanSchema, UserPurposeType } from "./types"
import { v4 } from "uuid"
import { revalidatePath } from "next/cache"
import { TraineePlanErrorChecker } from "./lib/utils"
import { getLocale } from "next-intl/server"
import { Locale } from "./i18n/config"

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
            SELECT * FROM trainertraineeplans WHERE traineeid = ${traineeid} AND trainerid = ${userid} AND iscompleted = false ORDER BY lastedited DESC
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
        
        return {trainings: response.rows as TraineesAndTrainings[], traineesWithoutPlans: traineesWithoutPlansResponse.rows as TraineesWithoutPlans[], error: null}
    }catch(error){
        console.error("Error fetching home screen data:", error);
        return {trainings: [], traineesWithoutPlans: [], error: "Something went wrong"}  
    }
}


            // SELECT gymusers.purpose, gymusers.trainercurrentaccounttype, gymusers.username, t.*  FROM gymusers 
            // INNER JOIN trainertraineeplans AS t ON gymusers.id = t.trainerid 
            // INNER JOIN trainertrainee AS tt ON tt.traineeid = gymusers.id  WHERE gymusers.id = tt.trainerid AND t.iscompleted = false ORDER BY t.lastedited DESC