import { User } from '@/domain/enterprise/entities/user/user'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { EditUserPermissionsService } from './update-user-permissions'

let sut: EditUserPermissionsService
let inMemoryUserRepository: InMemoryUserRepository
let authorizationService: AuthorizationService
let userRepository: UserRepository

describe('EditUserPermissions', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.USER_UPDATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new EditUserPermissionsService(
      inMemoryUserRepository,
      authorizationService,
    )
  })

  it('should be able to edit user permissions', async () => {
    const user = User.create({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: '12345678',
    })

    await inMemoryUserRepository.createUser(user)

    const result = await sut.execute({
      id: user.id.getValue(),
      permissions: [Permission.CLIENT_CREATE, Permission.ALL],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.users[0].permissions).toEqual([
      Permission.CLIENT_CREATE,
      Permission.ALL,
    ])
  })
})
