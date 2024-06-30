import { Role } from '@/domain/enterprise/entities/role/role'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryRoleRepository } from 'test/repositories/InMemoryRoleRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { CreateRoleService } from './create-role'

describe('CreateRole', () => {
  let sut: CreateRoleService
  let roleRepository: InMemoryRoleRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    roleRepository = new InMemoryRoleRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.ROLE_CREATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new CreateRoleService(roleRepository, authorizationService)
  })

  it('should be able to create a role', async () => {
    const response = await sut.execute({
      name: 'Role Name',
      description: 'arroz',
      creatorId: 'creatorId',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(Role))
    expect(roleRepository.roles).toHaveLength(1)
  })
})
