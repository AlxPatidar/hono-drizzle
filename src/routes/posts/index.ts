import { OpenAPIHono } from '@hono/zod-openapi'
import { getPost, posts, createPost, deletePost, updatePost } from './posts.routes'
import getPostHandler from './handlers/get_post'
import getAllPostHanlder from './handlers/get_posts'
import createPostHandler from './handlers/create_post'
import deletePostHandler from './handlers/delete_post'
import updatePostHandler from './handlers/update_post'
import { customError } from '../../utils/utils'

const route = new OpenAPIHono({
	defaultHook: (result, c) => (!result.success ? customError(result.error, c) : {}),
})

const router = route
	.openapi(posts, getAllPostHanlder)
	.openapi(getPost, getPostHandler)
	.openapi(deletePost, deletePostHandler)
	.openapi(createPost, createPostHandler)
	.openapi(updatePost, updatePostHandler)

export default router
