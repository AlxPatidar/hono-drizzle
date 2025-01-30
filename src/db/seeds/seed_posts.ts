import { faker } from '@faker-js/faker'

import { postTable, userTable } from '../schema'
import { dbType } from '..'

type userId = {
	id: number
}
// Function to generate fake user data
function generatePost(count: number, users: userId[]) {
	const posts = []
	for (let i = 0; i < count; i++) {
		const randomUser = users[Math.floor(Math.random() * users.length)]
		const post = {
			title: faker.lorem.sentence(),
			content: faker.lorem.paragraphs(3),
			user_id: randomUser.id, // Randomly selecting a user_id
			created_at: new Date(),
			updated_at: new Date(),
		}
		posts.push(post)
	}
	return posts
}
export default async function seed(db: dbType) {
	console.log('Seeding Post Table')
	// fetch existing user ids from the `users` table
	const users = await db
		.select({
			id: userTable.id,
		})
		.from(userTable)
	// Check if we have users in the database
	if (users.length === 0) {
		console.log('No users found, unable to generate posts')
		return
	}
	const posts: any = generatePost(50, users)
	await db.insert(postTable).values(posts)
	return true
}
