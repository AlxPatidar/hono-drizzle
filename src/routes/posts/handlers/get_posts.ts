import { Context } from 'hono'
import { postTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const posts = await db.query.postTable.findMany({
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
	return c.json(
		{
			status: true,
			message: 'All posts fetch sucessfully.',
			data: posts,
		},
		200,
	)
}
export default handler
