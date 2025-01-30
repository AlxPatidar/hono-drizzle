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
import { commentTable } from './comment'
import { likeTable } from './like'
import { postTable } from './post'
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
// relation
export const userTableRelations = relations(userTable, ({ one, many }) => {
	return {
		comments: many(commentTable),
		likes: many(likeTable),
		posts: one(postTable),
	}
})

export default userTable
