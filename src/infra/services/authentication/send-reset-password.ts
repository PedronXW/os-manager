import { SendResetPasswordService } from '@/domain/application/services/user/send-reset-password'
import { Encrypter } from '@/infra/cryptography/encrypter'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository'

const mongoConnection = new MongoConnection()
const userRepository = new MongoUserRepository(mongoConnection)
const encrypter = new Encrypter()
const sendResetPasswordService = new SendResetPasswordService(
  userRepository,
  encrypter,
)
export { sendResetPasswordService }
