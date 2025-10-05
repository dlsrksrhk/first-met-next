import {db} from "@/database/db";
import {userTable} from "@/database/schema";
import {eq} from "drizzle-orm";

export async function POST(request: Request) {
    const {email, password, name} = await request.json();

    try {
        const result = await db.transaction(async (tx) => {
            const [existingUser] = await db
                .select()
                .from(userTable)
                .where(eq(userTable.email, email));

            if (existingUser) {
                throw new Error('An email that already exists');
            }

            const newUser = await tx.insert(userTable)
                .values({
                    email, password, name
                }).returning();

            if (!newUser) {
                throw new Error('Failed to create a new user');
            }

            return newUser;
        });

        if (!result) {
            throw new Error('Failed to create a new user');
        }

        return Response.json(result, {status: 200});
    } catch (error: any) {
        return Response.json({error: error.message}, {status: 400});
    }
}