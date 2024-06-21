import { AuthenticateUserService } from '@/domain/application/services/user/authenticate-user'
import { Crypto } from '@/infra/cryptography/crypto'
import { Encrypter } from '@/infra/cryptography/encrypter'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository'

const encrypter = new Encrypter()
const hashComparer = new Crypto()
const mongoConnection = new MongoConnection()
const userRepository = new MongoUserRepository(mongoConnection)

const authenticateDeveloperService = new AuthenticateUserService(
  userRepository,
  hashComparer,
  encrypter,
)

export { authenticateDeveloperService }
