import { Hono } from 'hono'
import postRoutes from './posts/index'
import commentRoutes from './comments/index'

export const routes = (app: Hono) => {
	// set base route
	app.get('/', (c) => {
		return c.text('Hello Hono!')
	})
	// setup post router
	app.route('/', postRoutes)
	app.route('/', commentRoutes)
	return app
}
