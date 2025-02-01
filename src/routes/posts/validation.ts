import { z } from '@hono/zod-openapi'

export const createNewPostSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must be at least 3 characters long.' })
		.max(50, { message: 'Title cannot exceed 20 characters.' })
		.refine((value) => value !== undefined && value !== null, { message: 'Title is required.' }),
	// description should be a non-empty string
	content: z
		.string()
		.min(1, { message: 'Content must be at least 3 characters long.' })
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
})

export const idSchema = z.object({
	id: z
		.string()
		.transform((val) => {
			const num = Number(val)
			if (isNaN(num)) {
				throw new Error('Invalid number')
			}
			return num // Convert the string to a number
		})
		.refine((val) => !isNaN(val), {
			message: 'id must be a valid number',
		}),
})
