import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { userTable, UserRole } from '../schema'
import { dbType } from '..'

// Function to generate fake user data
function generateUsers(count: number) {
	const users = []
	const salt = bcrypt.genSaltSync(10)
	for (let i = 0; i < count; i++) {
		const user = {
			name: faker.person.fullName(),
			user_name: faker.internet.username(),
			phone: faker.phone.number(),
			is_active: faker.datatype.boolean(),
			last_login: faker.date.recent(),
			// default save password as password and bycrypt
			password: bcrypt.hashSync('password', salt),
			role: 'BASIC',
			email: `${faker.internet.email()}`.toLowerCase(),
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
