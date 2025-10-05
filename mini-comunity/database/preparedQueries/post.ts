import {db} from "@/database/db";
import {type SelectUserPostComment, userPostCommentTable, userPostTable, userTable} from "@/database/schema";
import {desc, eq, sql} from "drizzle-orm";

const selectPostBaseQuery = db
    .select({
        id: userPostTable.id,
        userId: userPostTable.userId,
        title: userPostTable.title,
        content: userPostTable.content,
        createdAt: userPostTable.createdAt,
        updatedAt: userPostTable.updatedAt,
        user: {
            id: userTable.id,
            name: userTable.name,
        },
        comments: sql<SelectUserPostComment[]>`
            CASE
                WHEN ${userPostCommentTable.id} IS NOT NULL
                THEN JSON_GROUP_ARRAY(
                    JSON_OBJECT(
                        'id', ${userPostCommentTable.id},
                        'userId', ${userPostCommentTable.userId},
                        'postId', ${userPostCommentTable.postId},
                        'content', ${userPostCommentTable.content},
                        'createdAt', ${userPostCommentTable.createdAt},
                        'updatedAt', ${userPostCommentTable.updatedAt}
                    )
                )
                ELSE JSON_ARRAY()
            END
        `
            .mapWith((commentJsonStr) => JSON.parse(commentJsonStr))
            .as('comments'),
    })
.from(userPostTable)
.innerJoin(userTable, eq(userTable.id, userPostTable.userId))
.leftJoin(userPostCommentTable, eq(userPostCommentTable.postId, userPostTable.id))
.groupBy(userPostTable.id)
.orderBy(desc(userPostTable.createdAt));

export const preparedPostsQuery = selectPostBaseQuery.prepare('preparedPostsQuery');

export const preparedPostQuery = selectPostBaseQuery
.where(eq(userPostTable.userId, sql.placeholder('postId')))
.prepare('preparedPostQuery');