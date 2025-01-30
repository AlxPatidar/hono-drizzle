import { Table, getTableName, sql } from 'drizzle-orm'

import db, { dbType } from '../index'
import { commentTable, likeTable, postTable, userTable } from '../schema'
import userSeed from './seed_users'
import postSeed from './seed_posts'
import commentSeed from './seed_comments'
import likeSeed from './seed_likes'

// truncate table
async function resetTable(db: dbType, table: Table) {
	return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)}`))
}

// seed user data
export default async function seed(db: dbType) {
	// remove foreign key checks for cascade data
	await db.execute(sql.raw('SET FOREIGN_KEY_CHECKS = 0'))
	// turncate table
	for (const table of [userTable, postTable, commentTable, likeTable]) {
		await resetTable(db, table)
	}
	// add foreigh key check back for cascade data
	await db.execute(sql.raw('SET FOREIGN_KEY_CHECKS = 1'))
	// seed user table
	await userSeed(db)
	// seed post table
	await postSeed(db)
	// seed comments table
	await commentSeed(db)
	// seed like table
	await likeSeed(db)
}

console.log('Seeding Started')
seed(db).then(() => {
	console.log('Seeding Ended')
	process.exit(0)
	return true
})
