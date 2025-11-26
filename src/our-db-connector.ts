import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'
import {FastifyInstance} from "fastify"

async function dbConnector (fastify: FastifyInstance, options: Object) {
  fastify.register(fastifyMongo, {
    // 공식문서에 있는 예시 그대로 사용
    url: 'mongodb://localhost:27017/test_database'
  })
}

export default fastifyPlugin(dbConnector)