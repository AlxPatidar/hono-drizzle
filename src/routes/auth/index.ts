import { OpenAPIHono } from '@hono/zod-openapi'
import { login, authRoutes, signup, verify } from './auth.routes'
import loginHandler from './handlers/login'
import verifyHandler from './handlers/verify'
import signupHandler from './handlers/signup'
import authRouteHandler from './handlers/auth_routes'
import { customError } from '../../utils/utils'

const route = new OpenAPIHono({
	defaultHook: (result, c) => (!result.success ? customError(result.error, c) : {}),
})

const router = route
	.openapi(login, loginHandler)
	.openapi(verify, verifyHandler)
	.openapi(signup, signupHandler)
	.openapi(authRoutes, authRouteHandler)

export default router
