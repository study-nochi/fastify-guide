import type {FastifyInstance, RouteShorthandOptions} from "fastify";

async function routes (fastify: FastifyInstance, options: Object) {
  // if (!fastify.mongo?.db) {
  //   throw new Error('MongoDB connection not available')
  // }
  // const collection = fastify.mongo.db.collection('test_collection')

  // 임시 데이터
  const mockAnimals = [
    { animal: 'dog', age: 3 },
    { animal: 'cat', age: 2 },
    { animal: 'bird', age: 1 }
  ]


  // JSON 직렬화 속도를 높이려면(네, 느립니다!) response다음 예와 같이 스키마 옵션의 키를 사용하세요.
  const serializeOptions: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  }

  fastify.get('/',serializeOptions, async (request, reply) => {
    return { hello: 'world' }
  })

  // 들어오는 요청을 검증하기 위해 Fastify는 JSON 스키마를 사용합니다 .
  const verifyOptions: RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        properties: {
          someKey: { type: 'string' },
          someOtherKey: { type: 'number' }
        }
      }
    }
  }

  fastify.post('/', verifyOptions, async (request, reply) => {
    return { hello: 'world' }
  })

  // Fastify는 'application/json' 및 'text/plain' 요청 페이로드를 기본적으로 파싱하며, 
  // 결과는 Fastify 요청 객체의 request.body에서 접근할 수 있습니다.
  const requestPayloadOptions: RouteShorthandOptions = {}
  fastify.post('/request-payload', requestPayloadOptions, async (request, reply) => {
    return request.body
  })


  fastify.get('/animals', async (request, reply) => {
    // const result = await collection.find().toArray()
    // if (result.length === 0) {
    //   throw new Error('No documents found')
    // }
    // return result
    return mockAnimals
  })
  
  interface AnimalParams {
    animal: string;
  }

  fastify.get<{ Params: AnimalParams }>('/animals/:animal', async (request, reply) => {
    // const result = await collection.findOne({ animal: request.params.animal })
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
    // return result
    const result = mockAnimals.find(a => a.animal === request.params.animal)
    if (!result) {
      throw new Error('Invalid value')
    }
    return result
  })

  const animalBodyJsonSchema = {
    type: 'object',
    required: ['animal'],
    properties: {
      animal: { type: 'string' },
    },
  }

  const schema = {
    body: animalBodyJsonSchema,
  }

  interface AnimalBody {
    animal: string;
  }

  fastify.post<{ Body: AnimalBody }>('/animals', { schema }, async (request, reply) => {
    // we can use the `request.body` object to get the data sent by the client
    // const result = await collection.insertOne({ animal: request.body.animal })
    // return result
    const newAnimal = { animal: request.body.animal, age: 0 }
    mockAnimals.push(newAnimal)
    return { acknowledged: true, insertedId: Math.random().toString(36).substr(2, 9) }
  })
}

export default routes;
