import { FindUserByIdService } from '@/domain/application/services/user/find-user-by-id'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository'

const mongoConnection = new MongoConnection()
const userRepository = new MongoUserRepository(mongoConnection)
const findUserByIdService = new FindUserByIdService(userRepository)

export { findUserByIdService }
