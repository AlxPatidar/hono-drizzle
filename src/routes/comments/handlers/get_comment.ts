import { eq } from 'drizzle-orm'
import { Context } from 'hono'
import { commentTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const id = parseInt(c.req.param('id'))
	const comment = await db.query.commentTable.findFirst({
		where: eq(commentTable.id, id),
		columns: {
			id: true,
			comment: true,
			post_id: true,
			created_at: true,
			updated_at: true,
		},
		with: {
			user: {
				columns: {
					name: true,
					id: true,
				},
			},
		},
	})
	if (!comment) {
		return c.json(
			{
				status: false,
				message: 'No comment found.',
				data: {},
			},
			200,
		)
	}
	return c.json(
		{
			status: true,
			message: 'Comment fetch sucessfully.',
			data: comment,
		},
		200,
	)
}
export default handler
