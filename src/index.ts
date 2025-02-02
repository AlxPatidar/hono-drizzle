import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { routes } from './routes'
import { jwt } from 'hono/jwt'
let app = new Hono().basePath('/api')
// show request logs
app.use(logger())

// check authenticate with auth urls
app.use('/auth/*', jwt({ secret: process.env.JWT_SECRET || '' }))

// create routes
app = routes(app)

// change config for change port number
export default {
	...app,
	port: process.env.PORT,
}
