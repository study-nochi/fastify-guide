import Fastify from 'fastify'
import dbConnector from './our-db-connector.ts'
import firstRoute from './our-first-route.ts'

const fastify = Fastify({
  logger: true
})

fastify.register(dbConnector)
fastify.register(firstRoute)

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()