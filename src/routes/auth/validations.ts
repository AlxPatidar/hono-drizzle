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

export const tokenSchema = z.object({
	Authorization: z.string().min(1, 'Authorization token is required'),
})
