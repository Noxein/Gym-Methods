import { Settings } from "../types"
import { sql } from "@vercel/postgres"

export const getTempo =  async (id:string) => {
    const user = await sql`
    SELECT setupcompleted,purpose,trainercurrentaccounttype,username,showtempo,settings FROM gymusers WHERE id = ${id}
    `
    const row = user.rows[0]
    return row
} 
