import { makeWorkOrderResult } from 'test/factories/unit/work-order-result-factory'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { DeleteWorkOrderResultService } from './delete-work-order-result'

describe('DeleteWorkOrderResult', () => {
  let sut: DeleteWorkOrderResultService
  let workOrderResultRepository: InMemoryWorkOrderResultRepository

  beforeEach(() => {
    workOrderResultRepository = new InMemoryWorkOrderResultRepository()
    sut = new DeleteWorkOrderResultService(workOrderResultRepository)
  })

  it('should be able to delete a work order result', async () => {
    const workOrderResult = await makeWorkOrderResult()

    workOrderResultRepository.createWorkOrderResult(workOrderResult)

    const response = await sut.execute({
      id: workOrderResult.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderResultRepository.workOrderResults).toHaveLength(0)
  })
})
