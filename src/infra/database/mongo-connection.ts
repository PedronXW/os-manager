import { Collection, MongoClient } from 'mongodb'
import { env } from '../env'

export class MongoConnection {
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(
      env.NODE_ENV === 'production'
        ? env.MONGO_URL_PRODUCTION
        : env.MONGO_URL_DEVELOPMENT,
    )
    this.connect()
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.close()
  }

  async createCollection(dbName: string, collectionName: string) {
    const database = this.client.db(dbName)
    const newCollection = await database.createCollection(collectionName)

    return newCollection
  }

  async getDatabase(dbName: string) {
    const database = this.client.db(dbName)
    return database
  }

  getCollection(dbName: string, collectionName: string): Collection {
    const database = this.client.db(dbName)
    const collection = database.collection(collectionName)
    return collection
  }
}
