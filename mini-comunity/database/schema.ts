import {pgTable, serial, varchar, timestamp, text} from "drizzle-orm/pg-core";
import {nanoid} from "nanoid";
import {relations} from "drizzle-orm";

export const userTable = pgTable("user", {
    id: varchar("id", {length: 21}).$defaultFn(() => nanoid(21)).primaryKey(),
    email: varchar("email", {length: 255}).unique().notNull(),
    password: varchar("password", {length: 255}).notNull(),
    name: varchar("name", {length: 100}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const userPostTable = pgTable("user_post", {
    id: varchar("id", {length: 21}).$defaultFn(() => nanoid(21)).primaryKey(),
    userId: varchar("user_id", {length: 21}).notNull()
        .references(() => userTable.id, {onDelete: "cascade"}),
    title: varchar("title", {length: 255}).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const userPostCommentTable = pgTable("user_post_comment", {
    id: varchar("id", {length: 21}).$defaultFn(() => nanoid(21)).primaryKey(),
    userId: varchar("user_id", {length: 21}).notNull()
        .references(() => userTable.id, {onDelete: "cascade"}),
    postId: varchar("post_id", {length: 21}).notNull()
        .references(() => userPostTable.id, {onDelete: "cascade"}),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

/**
 * 테이블 관계 정의
 */
// 사용자 - 게시글, 댓글 관계
export const userRelations = relations(userTable, ({many}) => ({
    posts: many(userPostTable),
    comments: many(userPostCommentTable),
}));

export const postRelations = relations(userPostTable, ({one, many}) => ({
    user: one(userTable, {
        fields: [userPostTable.userId],
        references: [userTable.id],
    }),
    comments: many(userPostCommentTable),
}));

export const commentRelations = relations(userPostCommentTable, ({one}) => ({
    user: one(userTable, {
        fields: [userPostCommentTable.userId],
        references: [userTable.id],
    }),
    post: one(userPostTable, {
        fields: [userPostCommentTable.postId],
        references: [userPostTable.id],
    })
}));

/**
 * 테이블들의 타입 정의
 */

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InserUserPost = typeof userPostTable.$inferInsert;
export type SelectUserPost = typeof userPostTable.$inferSelect & {
    user: Pick<SelectUser, 'id' | 'name'>;
    comments: SelectUserPostComment[];
};

export type InsertUserPostComment = typeof userPostCommentTable.$inferInsert;
export type SelectUserPostComment = typeof userPostCommentTable.$inferSelect;