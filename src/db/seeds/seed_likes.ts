import { faker } from '@faker-js/faker'

import { likeTable, postTable, userTable } from '../schema'
import { dbType } from '..'

type Ids = {
	id: number
}
type Like = {
	user_id: number
	post_id: number
	created_at: Date
	updated_at: Date
}
// Function to generate fake user data
function generateComments(count: number, users: Ids[], posts: Ids[]) {
	const likes: Like[] = []
	while (likes.length < count) {
		const randomUser = users[Math.floor(Math.random() * users.length)]
		const randomPost = posts[Math.floor(Math.random() * posts.length)]
		// check user already like the post
		const likeExists = likes.find((like) => like.user_id === randomUser.id && like.post_id === randomPost.id)
		if (!likeExists) {
			const like: Like = {
				user_id: randomUser.id, // Randomly selecting a user_id
				post_id: randomPost.id, // Randomly selecting a post_id
				created_at: new Date(),
				updated_at: new Date(),
			}
			likes.push(like)
		}
	}
	return likes
}
export default async function seed(db: dbType) {
	console.log('Seeding Likes Table')
	// fetch existing user ids from the `users` table
	const users = await db.select({ id: userTable.id }).from(userTable)
	// fetch existing user ids from the `users` table
	const posts = await db.select({ id: postTable.id }).from(postTable)
	// Check if we have users in the database
	if (users.length === 0) {
		console.log('No users found, unable to generate likes')
		return
		// Check if we have users in the database
	} else if (posts.length === 0) {
		console.log('No post found, unable to generate likes')
		return
	}
	const likes: any = generateComments(500, users, posts)
	await db.insert(likeTable).values(likes)
	return true
}
