import { eq } from 'drizzle-orm'
import { Context } from 'hono'
import { commentTable, postTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const id: number = parseInt(c.req.param('id'))
	const comments = await db.query.commentTable.findMany({
		where: eq(commentTable.post_id, id),
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
	return c.json(
		{
			status: true,
			message: 'All comments fetch sucessfully.',
			data: comments,
		},
		200,
	)
}
export default handler
