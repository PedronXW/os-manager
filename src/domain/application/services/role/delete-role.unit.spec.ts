import { makeRole } from 'test/factories/unit/role-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryRoleRepository } from 'test/repositories/InMemoryRoleRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { DeleteRoleService } from './delete-role'

describe('DeleteRole', () => {
  let sut: DeleteRoleService
  let roleRepository: InMemoryRoleRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    roleRepository = new InMemoryRoleRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.ROLE_DELETE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new DeleteRoleService(roleRepository, authorizationService)
  })

  it('should be able to delete a role', async () => {
    const role = await makeRole()

    roleRepository.createRole(role)

    const response = await sut.execute({
      id: role.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(roleRepository.roles).toHaveLength(0)
  })
})
