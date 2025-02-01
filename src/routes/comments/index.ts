import { OpenAPIHono } from '@hono/zod-openapi'
import { getComment, commentTable, createComment, deleteComment, updateComment } from './comments.routes'
import getCommentHandler from './handlers/get_comment'
import getAllCommentHanlder from './handlers/get_comments'
import createCommentHandler from './handlers/create_comment'
import deleteCommentHandler from './handlers/delete_comment'
import updateCommentHandler from './handlers/update_comment'
import { customError } from '../../utils/utils'

const route = new OpenAPIHono({
	defaultHook: (result, c) => (!result.success ? customError(result.error, c) : {}),
})

const router = route
	.openapi(commentTable, getAllCommentHanlder)
	.openapi(getComment, getCommentHandler)
	.openapi(deleteComment, deleteCommentHandler)
	.openapi(createComment, createCommentHandler)
	.openapi(updateComment, updateCommentHandler)

export default router
