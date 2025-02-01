import { eq } from 'drizzle-orm'
import { Context } from 'hono'
import { commentTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const id: number = parseInt(c.req.param('id'))
	await db.delete(commentTable).where(eq(commentTable.id, id))
	return c.json(
		{
			status: true,
			message: 'Comment deleted sucessfully.',
		},
		200,
	)
}
export default handler
