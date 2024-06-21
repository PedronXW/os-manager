import { ResetUserPasswordService } from '@/domain/application/services/user/reset-user-password'
import { Crypto } from '@/infra/cryptography/crypto'
import { Encrypter } from '@/infra/cryptography/encrypter'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository'

const mongoConnection = new MongoConnection()
const userRepository = new MongoUserRepository(mongoConnection)
const crypto = new Crypto()
const encrypter = new Encrypter()
const resetUserPasswordService = new ResetUserPasswordService(
  userRepository,
  crypto,
  encrypter,
)
export { resetUserPasswordService }
