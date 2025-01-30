import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, unique, int, text, timestamp, varchar, datetime, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const comments = mysqlTable("comments", {
	id: int().autoincrement().notNull(),
	postId: int("post_id").notNull().references(() => posts.id, { onDelete: "cascade" } ),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	comment: text().default(sql`('')`).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "comments_id"}),
	unique("comments_id_unique").on(table.id),
]);

export const likes = mysqlTable("likes", {
	id: int().autoincrement().notNull(),
	postId: int("post_id").notNull().references(() => posts.id, { onDelete: "cascade" } ),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "likes_id"}),
	unique("likes_id_unique").on(table.id),
	unique("uniq_user_and_post_idx").on(table.userId, table.postId),
]);

export const posts = mysqlTable("posts", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).default(').notNull(),
	content: text().default(sql`('')`),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "posts_id"}),
	unique("posts_id_unique").on(table.id),
]);

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	userName: varchar("user_name", { length: 255 }).notNull(),
	phone: varchar({ length: 255 }).notNull(),
	isActive: tinyint("is_active").default(1),
	lastLogin: datetime("last_login", { mode: 'string'}),
	password: varchar({ length: 255 }),
	userRole: mysqlEnum(['ADMIN','BASIC']).default('BASIC').notNull(),
	email: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("users_id_unique").on(table.id),
	unique("users_email_unique").on(table.email),
	unique("email_idx").on(table.email),
]);
