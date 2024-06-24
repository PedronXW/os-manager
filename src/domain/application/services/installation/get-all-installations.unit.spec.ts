import { makeInstallation } from 'test/factories/unit/installation-factory'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { GetAllInstallationsService } from './get-all-installations'

describe('GetAllInstallation', () => {
  let sut: GetAllInstallationsService
  let installationRepository: InMemoryInstallationRepository

  beforeEach(() => {
    installationRepository = new InMemoryInstallationRepository()
    sut = new GetAllInstallationsService(installationRepository)
  })

  it('should getall a installation', async () => {
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
