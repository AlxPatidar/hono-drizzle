import { Context } from 'hono'
const handler = async (c: Context) => {
	const { title } = await c.req.json()
	return c.json(
		{
			status: true,
			message: 'All posts fetch sucessfully.',
			data: title,
		},
		200,
	)
}
export default handler
