import { Installation } from '@/domain/enterprise/entities/installation/installation'
import { makeClient } from 'test/factories/unit/client-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { CreateInstallationService } from './create-installation'

describe('CreateInstallation', () => {
  let sut: CreateInstallationService
  let installationRepository: InMemoryInstallationRepository
  let clientRepository: InMemoryClientRepository

  beforeEach(() => {
    installationRepository = new InMemoryInstallationRepository()
    clientRepository = new InMemoryClientRepository()
    sut = new CreateInstallationService(
      installationRepository,
      clientRepository,
    )
  })

  it('should create a installation', async () => {
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
