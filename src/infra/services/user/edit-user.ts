import { EditUserService } from '@/domain/application/services/user/edit-user'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository'

const mongoConnection = new MongoConnection()
const userRepository = new MongoUserRepository(mongoConnection)
const editUserService = new EditUserService(userRepository)

export { editUserService }
