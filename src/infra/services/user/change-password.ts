import { ChangePasswordService } from '@/domain/application/services/user/change-password'
import { Crypto } from '@/infra/cryptography/crypto'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository'

const mongoConnection = new MongoConnection()
const userRepository = new MongoUserRepository(mongoConnection)
const crypto = new Crypto()
const changePasswordService = new ChangePasswordService(
  userRepository,
  crypto,
  crypto,
)

export { changePasswordService }
