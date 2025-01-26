import { Context } from 'hono'
import { ZodError } from 'zod'

export const customError = (result: ZodError, c: Context) => {
	const issues = result?.issues
	const errorMessage = issues.reduce((acc: Object, issue) => {
		const key = issue.path[0]
		if (issue.code === 'invalid_type' && issue.message === 'Required') {
			return Object.assign(acc, { [key]: `${key} is required.` })
		}
		return Object.assign(acc, { [key]: issue.message })
	}, {})
	return c.json(
		{
			status: false,
			message: 'Invalid payload.',
			data: errorMessage,
		},
		422,
	)
}
