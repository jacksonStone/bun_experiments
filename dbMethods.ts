import db from "./database";
const getUserByIdQuery = db.prepare("SELECT userId, userEmail, hashedPassword, salt FROM Users WHERE userId = ?");
import {User} from "./types"

export async function getUserById(userId: string): Promise<User> {
   return getUserByIdQuery.get(userId) as User;
}