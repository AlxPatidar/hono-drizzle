import { defineConfig } from 'drizzle-kit'
export default defineConfig({
	schema: './src/db/schema/index.ts',
	out: './src/db/migrations',
	dialect: 'mysql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
})
