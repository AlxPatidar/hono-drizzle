import { eq, sql } from 'drizzle-orm'
import { Context } from 'hono'
import { commentTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const id: number = parseInt(c.req.param('id'))
	// check comment exists before update the comment
	const commentExists = await db.select().from(commentTable).where(eq(commentTable.id, id))
	if (!commentExists.length) {
		return c.json(
			{
				status: false,
				message: 'Invalid comment id.',
			},
			200,
		)
	}
	const { comment } = await c.req.json()
	// update comment
	const updateComment = await db.update(commentTable).set({ comment }).where(eq(commentTable.id, id))
	return c.json(
		{
			status: true,
			message: 'Comment updated sucessfully.',
		},
		200,
	)
}
export default handler
