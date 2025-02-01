import { eq, sql } from 'drizzle-orm'
import { Context } from 'hono'
import { postTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const id: number = parseInt(c.req.param('id'))
	const post = await db.select().from(postTable).where(eq(postTable.id, id))
	if (!post.length) {
		return c.json(
			{
				status: false,
				message: 'Invalid Post sucessfully.',
			},
			200,
		)
	}
	const { title, content, user_id } = await c.req.json()
	const updatedPost = await db
		.update(postTable)
		.set({
			content,
			title,
			user_id,
		})
		.where(eq(postTable.id, id))
	return c.json(
		{
			status: true,
			message: 'Post updated fetch sucessfully.',
		},
		200,
	)
}
export default handler
