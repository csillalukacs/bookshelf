'use server'

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { pool } from "../postgres";
import { SimpleResult } from "./actions";

export async function editUsername(prevState: SimpleResult, formData: FormData): Promise<SimpleResult>
{
    const session = await auth();
    if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

    const userId = formData.get('userId');
    if (!userId) return {success: false, error: "User ID was not provided." };

    const username = formData.get('username');
    if (!username) return {success: false, error: 'Username is required'};
    let usernameStr = username.toString();
    usernameStr = usernameStr.trim();
    if (usernameStr.length === 0) return  {success: false, error: 'Username is required'};

    try 
    {
        console.log(`Updating username for user with id ${userId}...`);
        await pool.query(
            'UPDATE users SET username = $1 WHERE id = $2 RETURNING *', 
            [usernameStr, userId]
        );
        revalidatePath('/profile');
        return {success: true};
    }
    catch (error) 
    {
        console.error('Database Error:', error);
        return  {success: false, error: 'Unknown database error'};
    }
}