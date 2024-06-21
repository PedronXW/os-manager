import { DeleteUserService } from '@/domain/application/services/user/delete-user'
import { RedisCacheRepository } from '@/infra/cache/redis-repository'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository'

const mongoConnection = new MongoConnection()
const userRepository = new MongoUserRepository(mongoConnection)
const cacheRepository = new RedisCacheRepository()
const deleteUserService = new DeleteUserService(userRepository, cacheRepository)
export { deleteUserService }
