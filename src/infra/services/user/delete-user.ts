import { AuthorizationService } from '@/domain/application/services/authorization/authorization-service'
import { DeleteUserService } from '@/domain/application/services/user/delete-user'
import { RedisCacheRepository } from '@/infra/cache/redis-repository'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository'

export function generateDeleteUserServiceInstance(
  generatorId: string,
): DeleteUserService {
  const mongoConnection = new MongoConnection()
  const userRepository = new MongoUserRepository(mongoConnection)
  const cacheRepository = new RedisCacheRepository()
  const authorizationService = new AuthorizationService(
    userRepository,
    generatorId,
  )
  const deleteUserService = new DeleteUserService(
    userRepository,
    cacheRepository,
    authorizationService,
  )

  return deleteUserService
}
