import { faker } from '@faker-js/faker'

import { commentTable, postTable, userTable } from '../schema'
import { dbType } from '..'

type Ids = {
	id: number
}
// Function to generate fake user data
function generateComments(count: number, users: Ids[], posts: Ids[]) {
	const comments = []
	for (let i = 0; i < count; i++) {
		const randomUser = users[Math.floor(Math.random() * users.length)]
		const randomPost = posts[Math.floor(Math.random() * posts.length)]
		const comment = {
			comment: faker.lorem.sentence(),
			user_id: randomUser.id, // Randomly selecting a user_id
			post_id: randomPost.id, // Randomly selecting a post_id
			created_at: new Date(),
			updated_at: new Date(),
		}
		comments.push(comment)
	}
	return comments
}
export default async function seed(db: dbType) {
	console.log('Seeding Comments Table')
	// fetch existing user ids from the `users` table
	const users = await db.select({ id: userTable.id }).from(userTable)
	// fetch existing user ids from the `users` table
	const posts = await db.select({ id: postTable.id }).from(postTable)
	// Check if we have users in the database
	if (users.length === 0) {
		console.log('No users found, unable to generate comments')
		return
		// Check if we have users in the database
	} else if (posts.length === 0) {
		console.log('No post found, unable to generate comments')
		return
	}
	// create 300 comments on all posts
	const comments: any = generateComments(300, users, posts)
	await db.insert(commentTable).values(comments)
	return true
}
