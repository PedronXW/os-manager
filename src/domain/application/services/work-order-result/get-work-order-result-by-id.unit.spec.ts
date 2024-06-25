import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'
import { makeWorkOrderResult } from 'test/factories/unit/work-order-result-factory'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { GetWorkOrderResultByIdService } from './get-work-order-result-by-id'

describe('GetWorkOrderResultById', () => {
  let sut: GetWorkOrderResultByIdService
  let workOrderResultRepository: InMemoryWorkOrderResultRepository

  beforeEach(() => {
    workOrderResultRepository = new InMemoryWorkOrderResultRepository()
    sut = new GetWorkOrderResultByIdService(workOrderResultRepository)
  })

  it('should be able to get all a work order result', async () => {
    const workOrderResult = await makeWorkOrderResult()

    workOrderResultRepository.createWorkOrderResult(workOrderResult)

    const response = await sut.execute({
      id: workOrderResult.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(WorkOrderResult))
    expect(workOrderResultRepository.workOrderResults).toHaveLength(1)
  })
})
