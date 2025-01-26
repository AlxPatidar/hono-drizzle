import { Hono } from 'hono'
import postRoutes from './posts/index'

export const routes = (app: Hono) => {
	// set base route
	app.get('/', (c) => {
		return c.text('Hello Hono!')
	})
	// setup post router
	app.route('/', postRoutes)
	return app
}
