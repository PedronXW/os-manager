import { makeInstallation } from 'test/factories/unit/installation-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { UpdateInstallationService } from './update-installation'

describe('UpdateInstallation', () => {
  let sut: UpdateInstallationService
  let installationRepository: InMemoryInstallationRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    installationRepository = new InMemoryInstallationRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.INSTALLATION_UPDATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new UpdateInstallationService(
      installationRepository,
      authorizationService,
    )
  })

  it('should be able to update a installation', async () => {
    const installation = await makeInstallation()

    installationRepository.createInstallation(installation)

    const response = await sut.execute({
      id: installation.id.getValue(),
      description: 'arroz-doce',
    })

    expect(response.isRight()).toBeTruthy()
    expect(installationRepository.installations).toHaveLength(1)
    expect(installationRepository.installations[0].description).toEqual(
      'arroz-doce',
    )
  })
})
