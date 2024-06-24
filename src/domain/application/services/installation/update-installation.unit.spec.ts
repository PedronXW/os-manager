import { makeInstallation } from 'test/factories/unit/installation-factory'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { UpdateInstallationService } from './update-installation'

describe('UpdateInstallation', () => {
  let sut: UpdateInstallationService
  let installationRepository: InMemoryInstallationRepository

  beforeEach(() => {
    installationRepository = new InMemoryInstallationRepository()
    sut = new UpdateInstallationService(installationRepository)
  })

  it('should update a installation', async () => {
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
