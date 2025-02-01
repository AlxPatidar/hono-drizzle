import { z } from '@hono/zod-openapi'

export const createNewCommentSchema = z
	.object({
		comment: z
			.string()
			.min(3, { message: 'Title must be at least 3 characters long.' })
			.max(50, { message: 'Title cannot exceed 20 characters.' })
			.refine((value) => value !== undefined && value !== null, { message: 'Title is required.' }),
		// post id should be a valid number
		post_id: z
			.number()
			.int({ message: 'Post Id must be an integer.' }) // Ensure it's an integer
			.positive({ message: 'Post ID must be a positive number.' }) // Ensure it's a positive number, // user_id should be a valid UUID
			.refine((value) => !isNaN(parseInt(`${value}`)), { message: 'Post Id is required.' }),
		// user id should be a valid number
		user_id: z
			.number()
			.int({ message: 'User ID must be an integer.' }) // Ensure it's an integer
			.positive({ message: 'User ID must be a positive number.' }) // Ensure it's a positive number, // user_id should be a valid UUID
			.refine((value) => !isNaN(parseInt(`${value}`)), { message: 'User Id is required.' }),
	})
	.strict()

export const idSchema = z
	.object({
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
	.strict()

export const updateCommentSchema = z
	.object({
		comment: z
			.string()
			.min(3, { message: 'Title must be at least 3 characters long.' })
			.max(50, { message: 'Title cannot exceed 20 characters.' })
			.refine((value) => value !== undefined && value !== null, { message: 'Title is required.' }),
	})
	.strict()
