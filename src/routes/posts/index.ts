import { OpenAPIHono } from '@hono/zod-openapi'
import { getAllPosts } from './posts.routes'
import getAllPostsHandler from './handlers/posts'

const route = new OpenAPIHono()

const router = route.openapi(getAllPosts, getAllPostsHandler)
export default router
