import { createRoute } from '@hono/zod-openapi'
import { createNewCommentSchema, idSchema, updateCommentSchema } from './validation'

export const commentTable = createRoute({
	method: 'get',
	path: '/posts/{id}/comments',
	request: {
		params: idSchema,
	},
	responses: {
		200: {
			description: 'Retrieve the commentTable',
		},
	},
})

export const createComment = createRoute({
	method: 'post',
	path: '/comments',
	request: {
		body: {
			content: {
				'application/json': {
					schema: createNewCommentSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Create new commentTable',
		},
	},
})

export const getComment = createRoute({
	method: 'get',
	path: '/comments/{id}',
	request: {
		params: idSchema,
	},
	responses: {
		200: {
			description: 'Get comment',
		},
	},
})

export const deleteComment = createRoute({
	method: 'delete',
	path: '/comments/{id}',
	request: {
		params: idSchema,
	},
	responses: {
		200: {
			description: 'Delete comment',
		},
	},
})

export const updateComment = createRoute({
	method: 'put',
	path: '/comments/{id}',
	request: {
		params: idSchema,
		body: {
			content: {
				'application/json': {
					schema: updateCommentSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Create new commentTable',
		},
	},
})
