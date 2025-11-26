import type {FastifyPluginAsync} from 'fastify'
// import dbConnector from './our-db-connector.ts'
import firstRoute from './our-first-route.ts'

const app: FastifyPluginAsync = async (fastify, opts) => {
  // fastify.register(dbConnector)
  fastify.register(firstRoute)
}

export default app

// fastify-cli 옵션도 여기에서 export 가능
export const options = {
  logger: true
}