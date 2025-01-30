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
import { userTable } from './user'
import { commentTable } from './comment'
import { likeTable } from './like'
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

export default postTable
