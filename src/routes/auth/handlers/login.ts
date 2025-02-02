import { Context } from 'hono'
import bcrypt from 'bcryptjs'
import { sign } from 'hono/jwt'
import db from '../../../db'
import { userTable } from '../../../db/schema'
import { eq } from 'drizzle-orm'

const handler = async (c: Context) => {
	const { email, password } = await c.req.json()
	// get user data from users table with email
	const user = await db
		.select({
			email: userTable.email,
			password: userTable.password,
			name: userTable.name,
			user_name: userTable.user_name,
			is_active: userTable.is_active,
		})
		.from(userTable)
		.where(eq(userTable.email, `${email}`.trim().toLowerCase()))
	// check user is exists with this email id or not
	if (!user.length) {
		return c.json(
			{
				status: false,
				message: 'User not found with this email id',
			},
			200,
		)
	}
	// check password is correct with bcrypt hash
	const isValidPassword = bcrypt.compareSync(password, user[0].password)
	if (!isValidPassword) {
		return c.json(
			{
				status: false,
				message: 'Invalid password.',
			},
			200,
		)
	}

	const payload = {
		name: user[0].name,
		userName: user[0].user_name,
		isActive: user[0].is_active,
		email,
		exp: Math.floor(Date.now() / 1000) + 60 * 60,
	}

	const token = await sign(payload, process.env.JWT_SECRET || '')
	return c.json(
		{
			status: true,
			message: 'Login sucessfully.',
			token,
		},
		200,
	)
}
export default handler
