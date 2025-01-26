import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { routes } from './routes'
let app = new Hono().basePath('/api')
// show request logs
app.use(logger())
// create routes
app = routes(app)

// change config for change port number
export default {
	...app,
	port: process.env.PORT,
}
