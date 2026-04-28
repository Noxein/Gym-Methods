'use server'

import { sql } from "@vercel/postgres"
import { userID } from "./actions"
import { TraineePlan } from "./types"
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
            SELECT * FROM trainertraineeplans WHERE traineeid = ${userid} AND id = ${trainingId}
        `

        if(response.rows.length === 0) throw new Error("Nie można znaleźć treningu o podanym ID")

        return {response: response.rows[0] as TraineePlan, error: null}
    }catch(err) {
        const e = err as Error
        return {response: null, error: e.message}
    }
}

export const handleCloseTrainingSF = async (training: TraineePlan) => {
    const userid = await userID()
    const date = new Date()

    try{
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