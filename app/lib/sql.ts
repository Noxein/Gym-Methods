import { Settings } from "../types"
import { sql } from "@vercel/postgres"
import { v4 } from "uuid"

export const getTempo =  async (id:string) => {
    const user = await sql`
    SELECT setupcompleted,purpose,trainercurrentaccounttype,username,showtempo,settings FROM gymusers WHERE id = ${id}
    `
    const row = user.rows[0]
    return row
} 

export const saveError = async (errorData: any, userId?: string) => {
    const date = new Date().toISOString().split("T")[0]

    await sql`
        INSERT INTO "gym-errors" (id, error, date, userid)
        VALUES (${v4()}, ${JSON.stringify(errorData)}, ${date}, ${userId ?? null})
    `
}
