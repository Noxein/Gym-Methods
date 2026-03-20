import { sql } from "@vercel/postgres"

export const getTempo =  async (id:string) => {
    const user = await sql`
    SELECT setupcompleted,purpose,trainercurrentaccounttype FROM gymusers WHERE id = ${id}
    `
    return user.rows[0]
} 