import { relations } from 'drizzle-orm'
import {
	index,
	timestamp,
	int,
	boolean,
	mysqlTable,
	serial,
	varchar,
	datetime,
	mysqlEnum,
	uniqueIndex,
	text,
	unique,
} from 'drizzle-orm/mysql-core'

export const UserRole = mysqlEnum('userRole', ['ADMIN', 'BASIC'])
// create user table
export const userTable = mysqlTable(
	'users',
	{
		id: int().autoincrement().unique().primaryKey(),
		name: varchar({ length: 255 }).notNull(),
		user_name: varchar({ length: 255 }).notNull(),
		phone: varchar({ length: 255 }).notNull(),
		is_active: boolean().default(true),
		last_login: datetime(),
		password: varchar({ length: 255 }),
		role: UserRole.default('BASIC').notNull(),
		email: varchar({ length: 255 }).notNull().unique(),
		created_at: timestamp().defaultNow(),
		updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(() => new Date()),
	},
	(table) => {
		return {
			emailIndex: uniqueIndex('email_idx').on(table.email),
		}
	},
)

// create post table
export const postTable = mysqlTable('posts', {
	id: int().autoincrement().unique().primaryKey(),
	title: varchar({ length: 255 }).default('').notNull(),
	content: text().default(''),
	user_id: int('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	created_at: timestamp().defaultNow(),
	updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(() => new Date()),
})

// create comment table
export const commentTable = mysqlTable('comments', {
	id: int().autoincrement().unique().primaryKey(),
	post_id: int('post_id')
		.notNull()
		.references(() => postTable.id, { onDelete: 'cascade' }),
	user_id: int('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	comment: text().default('').notNull(),
	created_at: timestamp().defaultNow(),
	updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(() => new Date()),
})

// create like table
export const likeTable = mysqlTable(
	'likes',
	{
		id: int().autoincrement().unique().primaryKey(),
		post_id: int('post_id')
			.notNull()
			.references(() => postTable.id, { onDelete: 'cascade' }),
		user_id: int('user_id')
			.notNull()
			.references(() => userTable.id, { onDelete: 'cascade' }),
		created_at: timestamp().defaultNow(),
		updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(() => new Date()),
	},
	(table) => {
		return {
			uniqUserAndPost: unique('uniq_user_and_post_idx').on(table.user_id, table.post_id),
		}
	},
)

// relation
export const userTableRelations = relations(userTable, ({ one, many }) => {
	return {
		comments: many(commentTable),
		likes: many(likeTable),
		posts: one(postTable),
	}
})
export const postTableRelations = relations(postTable, ({ one, many }) => {
	return {
		comments: many(commentTable),
		likes: many(likeTable),
		user: one(userTable, {
			fields: [postTable.user_id],
			references: [userTable.id],
		}),
	}
})

export const commentTableRelations = relations(commentTable, ({ one, many }) => {
	return {
		user: one(userTable, {
			fields: [commentTable.user_id],
			references: [userTable.id],
		}),
		post: one(postTable, {
			fields: [commentTable.post_id],
			references: [postTable.id],
		}),
	}
})

export const likeTableRelations = relations(likeTable, ({ one, many }) => {
	return {
		user: one(userTable, {
			fields: [likeTable.user_id],
			references: [userTable.id],
		}),
		post: one(postTable, {
			fields: [likeTable.post_id],
			references: [postTable.id],
		}),
	}
})
