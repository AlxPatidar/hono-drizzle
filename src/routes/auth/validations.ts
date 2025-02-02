import { z } from '@hono/zod-openapi'

export const loginSchema = z
	.object({
		email: z
			.string()
			.email()
			.refine((value) => value !== undefined && value !== null, { message: 'Email is required.' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long.' })
			.max(50, { message: 'Password cannot exceed 20 characters.' })
			.refine((value) => value !== undefined && value !== null, { message: 'Password is required.' }),
	})
	.strict()

export const signupSchema = z
	.object({
		email: z
			.string()
			.email()
			.refine((value) => value !== undefined && value !== null, { message: 'Email is required.' }),
		phone: z
			.string()
			.min(9, { message: 'Phone must be at least 9 characters long.' })
			.refine(
				(value) => {
					return value !== undefined && value !== null
				},
				{ message: 'Phone is required.' },
			),
		name: z
			.string()
			.min(5, { message: 'Name must be at least 5 characters long.' })
			.refine(
				(value) => {
					return value !== undefined && value !== null
				},
				{ message: 'Name is required.' },
			),
		userName: z
			.string()
			.min(5, { message: 'User Name must be at least 5 characters long.' })
			.refine(
				(value) => {
					return value !== undefined && value !== null
				},
				{ message: 'User Name is required.' },
			),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long.' })
			.max(50, { message: 'Password cannot exceed 20 characters.' })
			.refine((value) => value !== undefined && value !== null, { message: 'Password is required.' }),
	})
	.strict()
export const tokenSchema = z.object({
	Authorization: z.string().min(1, 'Authorization token is required'),
})
