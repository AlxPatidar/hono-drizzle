import { migrate } from 'drizzle-orm/mysql2/migrator'
import config from '../../drizzle.config'
import db, { dbType } from '.'

async function dbMigrate(db: dbType) {
	await migrate(db, { migrationsFolder: config.out! })
}

console.log('Migration Started')
dbMigrate(db).then(() => {
	console.log('Migration Ends')
})
