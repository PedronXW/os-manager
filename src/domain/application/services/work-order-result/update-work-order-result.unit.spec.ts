import { makeWorkOrderResult } from 'test/factories/unit/work-order-result-factory'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { UpdateWorkOrderResultService } from './update-work-order-result'

describe('UpdateWorkOrderResult', () => {
  let sut: UpdateWorkOrderResultService
  let workOrderResultRepository: InMemoryWorkOrderResultRepository

  beforeEach(() => {
    workOrderResultRepository = new InMemoryWorkOrderResultRepository()
    sut = new UpdateWorkOrderResultService(workOrderResultRepository)
  })

  it('should be able to update a work order result', async () => {
    const workOrderResult = await makeWorkOrderResult()

    workOrderResultRepository.createWorkOrderResult(workOrderResult)

    const response = await sut.execute({
      id: workOrderResult.id.getValue(),
      description: 'arroz-doce',
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderResultRepository.workOrderResults).toHaveLength(1)
    expect(workOrderResultRepository.workOrderResults[0].description).toEqual(
      'arroz-doce',
    )
  })
})
