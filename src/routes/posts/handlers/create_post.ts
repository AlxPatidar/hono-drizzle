import { eq } from 'drizzle-orm'
import { Context } from 'hono'
import { postTable } from '../../../db/schema'
import db from '../../../db'

const handler = async (c: Context) => {
	const post = c.req.valid('json')
	// create post and return
	const createdPost = await db.insert(postTable).values(post).$returningId()
	// return created post
	const data = await db.select().from(postTable).where(eq(postTable.id, createdPost?.[0]?.id))
	return c.json(
		{
			status: true,
			message: 'New posts created sucessfully.',
			data: data?.[0],
		},
		200,
	)
}
export default handler
