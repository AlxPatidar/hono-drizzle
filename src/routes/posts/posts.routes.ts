import { z, createRoute } from '@hono/zod-openapi'

export const getAllPosts = createRoute({
	method: 'post',
	path: '/posts',
	request: {
		body: {
			content: {
				'application/json': {
					schema: z.object({
						title: z.string(),
					}),
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Retrieve the posts',
		},
	},
})
