import { createRoute } from '@hono/zod-openapi'
import { loginSchema, tokenSchema } from './validations'

export const login = createRoute({
	method: 'post',
	path: '/login',
	request: {
		body: {
			content: {
				'application/json': {
					schema: loginSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Create new posts',
		},
	},
})

export const verify = createRoute({
	method: 'get',
	path: '/verify',
	request: {
		headers: tokenSchema,
	},
	responses: {
		200: {
			description: 'Verify token',
		},
	},
})
