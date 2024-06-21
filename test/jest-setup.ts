import { MongoConnection } from '@/infra/database/mongo-connection'
import { randomInt } from 'crypto'
import * as matchers from 'jest-extended'
expect.extend(matchers)

beforeEach(async () => {
  process.env.NODE_ENV = 'test'
  process.env.COLLECTION_ID = randomInt(10000000).toString()
  const mongoConnection = new MongoConnection()
  await mongoConnection.createCollection(
    'teste',
    'teste_' + process.env.COLLECTION_ID + '_users',
  )
})

afterEach(async () => {
  const mongoConnection = new MongoConnection()
  const db = await mongoConnection.getDatabase('teste')

  const collectionsList = await db.listCollections().toArray()

  const collection = collectionsList.find(
    (collection) =>
      collection.name === 'teste_' + process.env.COLLECTION_ID + '_users',
  )

  if (collection) {
    await mongoConnection.dropCollection(
      'teste',
      'teste_' + process.env.COLLECTION_ID + '_users',
    )
  }

  await mongoConnection.disconnect()
})
