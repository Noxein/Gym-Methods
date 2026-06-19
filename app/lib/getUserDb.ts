import { sql } from "@vercel/postgres"
import { User } from "next-auth"
import { Settings } from "../types"

export const getUser = async(email:string) => {
    
    let users = await sql`
        SELECT id, password, email, showtempo, setupcompleted, purpose, trainercurrentaccounttype, username, avatarurl FROM gymusers WHERE email = ${email}
    `
    if(users.rowCount === 0) return null

    let userWithoutPassword = {
        id: users.rows[0].id,
        email: users.rows[0].email,
        setupcompleted: users.rows[0].setupcompleted,
        purpose: users.rows[0].purpose,
        trainercurrentaccounttype: users.rows[0].trainercurrentaccounttype,
        username: users.rows[0].username,
        avatarurl: users.rows[0].avatarurl,
        settings: {
            showtempo: users.rows[0].showtempo
        } satisfies Settings
    } as User

    return {user: userWithoutPassword, password: users.rows[0].password}
}  
