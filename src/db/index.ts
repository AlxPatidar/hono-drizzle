import { drizzle } from 'drizzle-orm/mysql2'
// You can specify any property from the mysql2 connection options
const db = drizzle({ connection: { uri: process.env.DATABASE_URL } })

export type dbType = typeof db

export const dbType = typeof db

export default db
