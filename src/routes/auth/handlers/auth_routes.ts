import { Context } from 'hono'

const handler = async (c: Context) => {
	// extract auth user from jwt token
	const jwtUser = c.get('jwt')
	return c.json(
		{
			status: true,
			message: 'Private route.',
			data: jwtUser,
		},
		200,
	)
}
export default handler
