import { faker } from '@faker-js/faker'

import { userTable, UserRole } from '../schema'
import { dbType } from '..'

// Function to generate fake user data
function generateUsers(count: number) {
	const users = []
	for (let i = 0; i < count; i++) {
		const user = {
			name: faker.person.fullName(),
			user_name: faker.internet.username(),
			phone: faker.phone.number(),
			is_active: faker.datatype.boolean(),
			last_login: faker.date.recent(),
			password: faker.internet.password(),
			role: 'BASIC',
			email: faker.internet.email(),
			created_at: new Date(),
			updated_at: new Date(),
		}
		users.push(user)
	}
	return users
}
export default async function seed(db: dbType) {
	console.log('Seeding User Table')
	const users: any = generateUsers(10)
	await db.insert(userTable).values(users)
	return true
}
