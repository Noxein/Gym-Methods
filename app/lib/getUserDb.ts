import { sql } from "@vercel/postgres"

export const getUser = async(email:string) => {
    
    let users = await sql`
        SELECT * FROM gymusers WHERE email = ${email}
    `
    console.log(users)
    const user = users.rows[0]

    if(!user) return null

    return user 
} 