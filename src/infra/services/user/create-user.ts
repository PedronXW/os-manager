import { CreateUserService } from '@/domain/application/services/user/create-user'
import { Crypto } from '@/infra/cryptography/crypto'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository'

const mongoConnection = new MongoConnection()
const userRepository = new MongoUserRepository(mongoConnection)
const crypto = new Crypto()
const createUserService = new CreateUserService(userRepository, crypto)

export { createUserService }
