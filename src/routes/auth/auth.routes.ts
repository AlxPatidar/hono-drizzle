import { createRoute } from '@hono/zod-openapi'
import { loginSchema, signupSchema, tokenSchema } from './validations'

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
			description: 'User Login',
		},
	},
})

export const signup = createRoute({
	method: 'post',
	path: '/signup',
	request: {
		body: {
			content: {
				'application/json': {
					schema: signupSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'User Signup',
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

export const authRoutes = createRoute({
	method: 'get',
	path: '/auth/route',
	request: {
		headers: tokenSchema,
	},
	responses: {
		200: {
			description: 'Route with authentication',
		},
	},
})
