import { eq } from 'drizzle-orm'
import { Context } from 'hono'
import { commentTable, postTable, userTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const comment = await c.req.json()
	// check user id before create comment that user is already exists or not
	const userExists = await db.select().from(userTable).where(eq(userTable.id, comment.user_id))
	if (!userExists.length) {
		return c.json(
			{
				status: false,
				message: 'User not exists with this user id',
			},
			200,
		)
	}
	// check post id before create comment that comment attached to right post
	const postExists = await db.select().from(postTable).where(eq(postTable.id, comment.post_id))
	if (!postExists.length) {
		return c.json(
			{
				status: false,
				message: 'Post not exists with this post id',
			},
			200,
		)
	}
	// create comment and return
	const createdComment = await db.insert(commentTable).values(comment).$returningId()
	// return created comment
	const data = await db.select().from(commentTable).where(eq(commentTable.id, createdComment?.[0]?.id))
	return c.json(
		{
			status: true,
			message: 'New comment created sucessfully.',
			data: data?.[0],
		},
		200,
	)
}
export default handler
