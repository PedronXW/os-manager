import { makeWorkOrderResult } from 'test/factories/unit/work-order-result-factory'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { GetAllWorkOrderResultsService } from './get-all-work-orders-result'

describe('GetAllWorkOrderResult', () => {
  let sut: GetAllWorkOrderResultsService
  let workOrderResultRepository: InMemoryWorkOrderResultRepository

  beforeEach(() => {
    workOrderResultRepository = new InMemoryWorkOrderResultRepository()
    sut = new GetAllWorkOrderResultsService(workOrderResultRepository)
  })

  it('should be able to get all work order results', async () => {
    const workOrderResult = await makeWorkOrderResult()

    workOrderResultRepository.createWorkOrderResult(workOrderResult)

    const response = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      workOrderResults: expect.any(Array),
      workOrderResultsQueryCount: 1,
    })
    expect(workOrderResultRepository.workOrderResults).toHaveLength(1)
  })
})
