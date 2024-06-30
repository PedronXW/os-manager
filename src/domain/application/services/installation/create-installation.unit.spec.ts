import { Installation } from '@/domain/enterprise/entities/installation/installation'
import { makeClient } from 'test/factories/unit/client-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { CreateInstallationService } from './create-installation'

describe('CreateInstallation', () => {
  let sut: CreateInstallationService
  let installationRepository: InMemoryInstallationRepository
  let clientRepository: InMemoryClientRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    installationRepository = new InMemoryInstallationRepository()
    clientRepository = new InMemoryClientRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.INSTALLATION_CREATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new CreateInstallationService(
      installationRepository,
      clientRepository,
      authorizationService,
    )
  })

  it('should be able to create a installation', async () => {
    const client = makeClient({})

    clientRepository.createClient(client)

    const response = await sut.execute({
      name: 'Installation Name',
      client: client.id.getValue(),
      description: 'arroz',
      creatorId: 'creatorId',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(Installation))
    expect(installationRepository.installations).toHaveLength(1)
  })
})
