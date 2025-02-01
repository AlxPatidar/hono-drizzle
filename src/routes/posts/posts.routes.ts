import { createRoute } from '@hono/zod-openapi'
import { createNewPostSchema, idSchema } from './validation'

export const posts = createRoute({
	method: 'get',
	path: '/posts',
	request: {},
	responses: {
		200: {
			description: 'Retrieve the posts',
		},
	},
})

export const createPost = createRoute({
	method: 'post',
	path: '/posts',
	request: {
		body: {
			content: {
				'application/json': {
					schema: createNewPostSchema,
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

export const getPost = createRoute({
	method: 'get',
	path: '/posts/{id}',
	request: {
		params: idSchema,
	},
	responses: {
		200: {
			description: 'Get post',
		},
	},
})

export const deletePost = createRoute({
	method: 'delete',
	path: '/posts/{id}',
	request: {
		params: idSchema,
	},
	responses: {
		200: {
			description: 'Delete post',
		},
	},
})

export const updatePost = createRoute({
	method: 'put',
	path: '/posts/{id}',
	request: {
		params: idSchema,
		body: {
			content: {
				'application/json': {
					schema: createNewPostSchema,
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
