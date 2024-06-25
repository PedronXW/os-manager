import { Installation } from '@/domain/enterprise/entities/installation/installation'
import { makeInstallation } from 'test/factories/unit/installation-factory'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { GetInstallationByIdService } from './get-installation-by-id'

describe('GetInstallationById', () => {
  let sut: GetInstallationByIdService
  let installationRepository: InMemoryInstallationRepository

  beforeEach(() => {
    installationRepository = new InMemoryInstallationRepository()
    sut = new GetInstallationByIdService(installationRepository)
  })

  it('should be able to get a installation by id', async () => {
    const installation = await makeInstallation()

    installationRepository.createInstallation(installation)

    const response = await sut.execute({
      id: installation.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(Installation))
    expect(installationRepository.installations).toHaveLength(1)
  })
})
