import { makeRole } from 'test/factories/unit/role-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryRoleRepository } from 'test/repositories/InMemoryRoleRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { UpdateRoleService } from './update-role'

describe('UpdateRole', () => {
  let sut: UpdateRoleService
  let roleRepository: InMemoryRoleRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    roleRepository = new InMemoryRoleRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.ROLE_UPDATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new UpdateRoleService(roleRepository, authorizationService)
  })

  it('should be able to update a role', async () => {
    const role = await makeRole()

    roleRepository.createRole(role)

    const response = await sut.execute({
      id: role.id.getValue(),
      description: 'arroz-doce',
    })

    expect(response.isRight()).toBeTruthy()
    expect(roleRepository.roles).toHaveLength(1)
    expect(roleRepository.roles[0].description).toEqual('arroz-doce')
  })
})
