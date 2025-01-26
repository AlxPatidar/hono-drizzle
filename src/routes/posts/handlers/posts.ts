import { Context } from 'hono'
const handler = async (c: Context) => {
	const data = await c.req.json()
	return c.json(
		{
			status: true,
			message: 'All posts fetch sucessfully.',
			data,
		},
		200,
	)
}
export default handler
