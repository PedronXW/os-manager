import { makeWorkOrderAvaliation } from 'test/factories/unit/work-order-avaliation-factory'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { GetAllWorkOrderAvaliationsService } from './get-all-work-orders-avaliation'

describe('GetAllWorkOrderAvaliation', () => {
  let sut: GetAllWorkOrderAvaliationsService
  let workOrderAvaliationRepository: InMemoryWorkOrderAvaliationRepository

  beforeEach(() => {
    workOrderAvaliationRepository = new InMemoryWorkOrderAvaliationRepository()
    sut = new GetAllWorkOrderAvaliationsService(workOrderAvaliationRepository)
  })

  it('should be able to get all work order avaliations', async () => {
    const workOrderAvaliation = await makeWorkOrderAvaliation()

    workOrderAvaliationRepository.createWorkOrderAvaliation(workOrderAvaliation)

    const response = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      workOrderAvaliations: expect.any(Array),
      workOrderAvaliationsQueryCount: 1,
    })
    expect(workOrderAvaliationRepository.workOrderAvaliations).toHaveLength(1)
  })
})
