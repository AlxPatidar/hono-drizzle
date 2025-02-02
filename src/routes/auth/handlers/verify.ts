import { Context } from 'hono'
import { verify } from 'hono/jwt'

const handler = async (c: Context) => {
	const token = c.req.header('Authorization')
	if (!token) {
		return c.json(
			{
				status: false,
				message: 'Invalid token.',
			},
			200,
		)
	}
	// validate token and response with user data
	const isValidToken = await verify(token, process.env.JWT_SECRET || '')
	if (isValidToken) {
		return c.json(
			{
				status: true,
				message: 'Token is valid.',
				data: isValidToken,
				token,
			},
			200,
		)
	} else {
		return c.json(
			{
				status: false,
				message: 'Token is expire Please login again.',
			},
			200,
		)
	}
}
export default handler
