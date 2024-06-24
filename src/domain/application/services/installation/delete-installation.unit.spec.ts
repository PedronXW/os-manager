import { makeInstallation } from 'test/factories/unit/installation-factory'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { DeleteInstallationService } from './delete-installation'

describe('DeleteInstallation', () => {
  let sut: DeleteInstallationService
  let installationRepository: InMemoryInstallationRepository

  beforeEach(() => {
    installationRepository = new InMemoryInstallationRepository()
    sut = new DeleteInstallationService(installationRepository)
  })

  it('should delete a installation', async () => {
    const installation = await makeInstallation()

    installationRepository.createInstallation(installation)

    const response = await sut.execute({
      id: installation.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(installationRepository.installations).toHaveLength(0)
  })
})
