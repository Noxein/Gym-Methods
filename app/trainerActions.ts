'use server'

import { sql } from "@vercel/postgres"
import { userID } from "./actions"
import { TraineePlan, TrainerPlanSchema } from "./types"
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