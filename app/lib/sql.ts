import { sql } from "@vercel/postgres"

export const getTempo =  async (id:string) => {
    const user = await sql`
    SELECT showtempo FROM gymusers WHERE id = ${id}
    `
    return user.rows[0].showtempo
}