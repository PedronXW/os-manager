import { makeInstallation } from 'test/factories/unit/installation-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetAllInstallationsService } from './get-all-installations'

describe('GetAllInstallation', () => {
  let sut: GetAllInstallationsService
  let installationRepository: InMemoryInstallationRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    installationRepository = new InMemoryInstallationRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.INSTALLATION_GET],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new GetAllInstallationsService(
      installationRepository,
      authorizationService,
    )
  })

  it('should be able to get all installations', async () => {
    const installation = await makeInstallation()

    installationRepository.createInstallation(installation)

    const response = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      installations: expect.any(Array),
      installationsQueryCount: 1,
    })
    expect(installationRepository.installations).toHaveLength(1)
  })
})
