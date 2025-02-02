import { Hono } from 'hono'
import postRoutes from './posts/index'
import commentRoutes from './comments/index'
import authRoutes from './auth/index'

export const routes = (app: Hono) => {
	// set base route
	app.get('/', (c) => {
		return c.text('Hello Hono!')
	})
	// setup post router
	app.route('/', postRoutes)
	app.route('/', commentRoutes)
	app.route('/', authRoutes)

	return app
}
