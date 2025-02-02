import { Context } from 'hono'
import { verify } from 'hono/jwt'
import { ZodError } from 'zod'
import type { MiddlewareHandler } from 'hono'

export const customError = (result: ZodError, c: Context) => {
	const issues = result?.issues
	const errorMessage = issues.reduce((acc: Object, issue) => {
		const key = issue.path[0]
		if (issue.code === 'invalid_type' && issue.message === 'Required') {
			return Object.assign(acc, { [key]: `${key} is required.` })
		}
		return Object.assign(acc, { [key]: issue.message })
	}, {})
	return c.json(
		{
			status: false,
			message: 'Invalid payload.',
			data: errorMessage,
		},
		422,
	)
}

// create a middleware for private routes, convert token into decode token
export const jwtMiddleware = (): MiddlewareHandler => {
	return async (c, next) => {
		try {
			const token = c.req.header('Authorization')
			if (!token) {
				return c.json({
					status: false,
					message: 'Private route authorization token is required.',
				})
			}
			// validate token and response with user data
			const user = await verify(token, process.env.JWT_SECRET || '')
			c.set('jwt', user)
			await next()
		} catch (error) {
			console.log({ error })
			return c.json({
				status: false,
				message: 'Invalid token.',
			})
		}
	}
}
