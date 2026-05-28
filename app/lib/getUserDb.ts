import { sql } from "@vercel/postgres"
import { User } from "next-auth"

export const getUser = async(email:string) => {
    
    let users = await sql`
        SELECT id, password, email, showtempo, setupcompleted, goal, purpose, trainercurrentaccounttype, username, avatarurl FROM gymusers WHERE email = ${email}
    `
    if(users.rowCount === 0) return null

    let userWithoutPassword = {
        id: users.rows[0].id,
        email: users.rows[0].email,
        showtempo: users.rows[0].showtempo,
        setupcompleted: users.rows[0].setupcompleted,
        goal: users.rows[0].goal,
        purpose: users.rows[0].purpose,
        trainercurrentaccounttype: users.rows[0].trainercurrentaccounttype,
        username: users.rows[0].username,
        avatarurl: users.rows[0].avatarurl
    } as User

    return {user: userWithoutPassword, password: users.rows[0].password}
}  
