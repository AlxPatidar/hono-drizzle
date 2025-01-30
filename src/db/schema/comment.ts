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

import { postTable } from './post'
import { userTable } from './user'

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

export default commentTable
