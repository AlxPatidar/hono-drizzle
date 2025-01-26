import { z, createRoute } from '@hono/zod-openapi'
export const getAllPosts = createRoute({
	method: 'post',
	path: '/posts',
	request: {
		body: {
			content: {
				'application/json': {
					schema: z.object({
						title: z
							.string()
							.min(3, { message: 'Title must be at least 3 characters long.' })
							.max(20, { message: 'Title cannot exceed 20 characters.' })
							.refine((value) => value !== undefined && value !== null, { message: 'Title is required.' }),
						// description should be a non-empty string
						description: z
							.string()
							.min(1, { message: 'Description must be at least 3 characters long.' })
							.refine(
								(value) => {
									return value !== undefined && value !== null
								},
								{ message: 'Description is required.' },
							),
						// user id should be a valid number
						user_id: z
							.number()
							.int({ message: 'User ID must be an integer.' }) // Ensure it's an integer
							.positive({ message: 'User ID must be a positive number.' }) // Ensure it's a positive number, // user_id should be a valid UUID
							.refine((value) => !isNaN(parseInt(`${value}`)), { message: 'User Id is required.' }),
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
