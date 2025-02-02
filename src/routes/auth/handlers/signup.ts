import { Context } from 'hono'
import { genSaltSync, hashSync } from 'bcryptjs'
import { userTable } from '../../../db/schema'
import db from '../../../db'
import { eq, or } from 'drizzle-orm'

const handler = async (c: Context) => {
	const { name, userName, email, password, phone } = await c.req.json()
	// get user data from users table with email
	const user = await db
		.select()
		.from(userTable)
		.where(or(eq(userTable.user_name, `${userName}`.trim()), eq(userTable.email, `${email}`.trim().toLowerCase())))
	// check user is exists with this email id or not
	if (user.length) {
		return c.json(
			{
				status: false,
				message: 'User already exists with this user name or email id',
			},
			200,
		)
	}
	// encrypt password
	const salt = genSaltSync(10)
	// save user into the db
	const createUser: any = await db
		.insert(userTable)
		.values([
			{
				name,
				user_name: userName,
				phone,
				role: 'BASIC',
				email: `${email}`.trim().toLowerCase(),
				is_active: 1,
				created_at: new Date(),
				updated_at: new Date(),
				// save bcrypt password
				password: hashSync(password, salt),
			},
		])
		.$returningId()
	// return basic user detail
	const updatedUser = await db
		.select({
			id: userTable.id,
			email: userTable.email,
			name: userTable.name,
			user_name: userTable.user_name,
			phone: userTable.phone,
		})
		.from(userTable)
		.where(eq(userTable.id, parseInt(createUser[0].id)))
	return c.json(
		{
			status: true,
			message: 'Signup sucessfully.',
			data: updatedUser[0],
		},
		200,
	)
}
export default handler
