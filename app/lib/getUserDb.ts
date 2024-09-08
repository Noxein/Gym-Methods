import { sql } from "@vercel/postgres"

export const getUser = async(email:string) => {
    
    let users = await sql`
        SELECT * FROM gymusers WHERE email = ${email}
    `
    if(users.rowCount === 0) return null

    return users.rows[0] 
} 