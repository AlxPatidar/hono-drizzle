import { drizzle } from 'drizzle-orm/mysql2'
import { createConnection } from 'mysql2'
import * as schema from './schema/index'

// create mysql connection
export const connection = createConnection({
	uri: process.env.DATABASE_URL,
})
// You can specify any property from the mysql2 connection options
const db = drizzle({ client: connection, schema, mode: 'planetscale' })

export type dbType = typeof db

export const dbType = typeof db

export default db
