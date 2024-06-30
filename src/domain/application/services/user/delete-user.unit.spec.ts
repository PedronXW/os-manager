import { User } from '@/domain/enterprise/entities/user/user'
import { InMemoryCacheRepository } from 'test/cache/InMemoryCacheRepository'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { DeleteUserService } from './delete-user'

let sut: DeleteUserService
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryCacheRepository: InMemoryCacheRepository
let authorizationService: AuthorizationService
let userRepository: UserRepository

describe('DeleteUser', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryCacheRepository = new InMemoryCacheRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.USER_DELETE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new DeleteUserService(
      inMemoryUserRepository,
      inMemoryCacheRepository,
      authorizationService,
    )
  })

  it('should be able to delete a user', async () => {
    const user = User.create({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: '12345678',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute({ id: user.id.getValue() })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.users).toHaveLength(0)
  })

  it('should be able to not delete a user because a wrong id', async () => {
    const user = User.create({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: '12345678',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute({ id: 'wrong id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNonExistsError)
    expect(inMemoryUserRepository.users).toHaveLength(1)
  })
})
