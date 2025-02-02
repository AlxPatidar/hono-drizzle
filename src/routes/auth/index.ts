import { OpenAPIHono } from '@hono/zod-openapi'
import { login, verify } from './auth.routes'
import loginHandler from './handlers/login'
import verifyHandler from './handlers/verify'
import { customError } from '../../utils/utils'

const route = new OpenAPIHono({
	defaultHook: (result, c) => (!result.success ? customError(result.error, c) : {}),
})

const router = route.openapi(login, loginHandler).openapi(verify, verifyHandler)

export default router
