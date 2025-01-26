import { OpenAPIHono } from '@hono/zod-openapi'
import { getAllPosts } from './posts.routes'
import getAllPostsHandler from './handlers/posts'
import { customError } from '../../utils/utils'

const route = new OpenAPIHono({
	defaultHook: (result, c) => (!result.success ? customError(result.error, c) : {}),
})

const router = route.openapi(getAllPosts, getAllPostsHandler)
export default router
