import { eq } from 'drizzle-orm'
import { Context } from 'hono'
import { postTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const id = c.req.param('id')
	await db.delete(postTable).where(eq(postTable.id, id))
	return c.json(
		{
			status: true,
			message: 'Post deleted fetch sucessfully.',
		},
		200,
	)
}
export default handler
