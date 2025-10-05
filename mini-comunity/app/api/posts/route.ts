import {db} from "@/database/db";
import {userPostTable} from "@/database/schema";
import {NextRequest} from "next/server";
import {preparedPostsQuery} from "@/database/preparedQueries/post";
import authOptions from "@/lib/authOptions";
import {getServerSession} from "next-auth";

export async function GET(request: NextRequest) {
    try {
        const posts = await preparedPostsQuery.execute();

        return Response.json(posts, {status: 200});
    } catch (error: any) {
        return Response.json({error: error.message}, {status: 400});
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return Response.json({error: 'Unauthorized'}, {status: 401});
    }

    const {title, content} = await request.json();

    try {
        const newPost = await db
            .insert(userPostTable)
            .values({
                userId, title, content
            })
            .returning();

        return Response.json(newPost, {status: 200});
    } catch (error: any) {
        return Response.json({error: 'An error occurred'}, {status: 400});
    }
}