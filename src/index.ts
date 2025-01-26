import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
	return c.text('Hello Hono!')
})
app.get('/api/world', (c) => {
	return c.json({
		ok: true,
		message: 'Hello Hono!',
	})
})
export default {
	port: process.env.PORT,
	fetch: app.fetch,
}
