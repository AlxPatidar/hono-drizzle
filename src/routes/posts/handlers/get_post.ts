import { eq } from 'drizzle-orm'
import { Context } from 'hono'
import { postTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const id = c.req.param('id')
	const posts = await db.query.postTable.findFirst({
		where: eq(postTable.id, id),
		columns: {
			id: true,
			title: true,
			content: true,
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
			comments: {
				columns: {
					comment: true,
					created_at: true,
				},
				with: {
					user: {
						columns: {
							name: true,
							id: true,
						},
					},
				},
			},
		},
	})
	if (!posts) {
		return c.json(
			{
				status: false,
				message: 'Invalid post id.',
				data: posts,
			},
			200,
		)
	}
	return c.json(
		{
			status: true,
			message: 'Post fetch sucessfully.',
			data: posts,
		},
		200,
	)
}
export default handler
