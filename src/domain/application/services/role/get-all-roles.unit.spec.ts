import { makeRole } from 'test/factories/unit/role-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryRoleRepository } from 'test/repositories/InMemoryRoleRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetAllRolesService } from './get-all-roles'

describe('GetAllRole', () => {
  let sut: GetAllRolesService
  let roleRepository: InMemoryRoleRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    roleRepository = new InMemoryRoleRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.ROLE_GET],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new GetAllRolesService(roleRepository, authorizationService)
  })

  it('should be able to get all roles', async () => {
    const role = await makeRole()

    roleRepository.createRole(role)

    const response = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      roles: expect.any(Array),
      rolesQueryCount: 1,
    })
    expect(roleRepository.roles).toHaveLength(1)
  })
})
