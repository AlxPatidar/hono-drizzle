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
import { postTable } from './post'

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

export const likeTableRelations = relations(likeTable, ({ one }) => {
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

export default likeTable
