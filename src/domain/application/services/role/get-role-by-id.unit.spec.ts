import { Role } from '@/domain/enterprise/entities/role/role'
import { makeRole } from 'test/factories/unit/role-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryRoleRepository } from 'test/repositories/InMemoryRoleRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetRoleByIdService } from './get-role-by-id'

describe('GetRoleById', () => {
  let sut: GetRoleByIdService
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
    sut = new GetRoleByIdService(roleRepository, authorizationService)
  })

  it('should be able to get a role by id', async () => {
    const role = await makeRole()

    roleRepository.createRole(role)

    const response = await sut.execute({
      id: role.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(Role))
    expect(roleRepository.roles).toHaveLength(1)
  })
})
