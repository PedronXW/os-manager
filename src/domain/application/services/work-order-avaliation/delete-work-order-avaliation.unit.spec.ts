import { makeWorkOrderAvaliation } from 'test/factories/unit/work-order-avaliation-factory'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { DeleteWorkOrderAvaliationService } from './delete-work-order-avaliation'

describe('DeleteWorkOrderAvaliation', () => {
  let sut: DeleteWorkOrderAvaliationService
  let workOrderAvaliationRepository: InMemoryWorkOrderAvaliationRepository

  beforeEach(() => {
    workOrderAvaliationRepository = new InMemoryWorkOrderAvaliationRepository()
    sut = new DeleteWorkOrderAvaliationService(workOrderAvaliationRepository)
  })

  it('should be able delete a work order avaliation', async () => {
    const workOrderAvaliation = await makeWorkOrderAvaliation()

    workOrderAvaliationRepository.createWorkOrderAvaliation(workOrderAvaliation)

    const response = await sut.execute({
      id: workOrderAvaliation.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderAvaliationRepository.workOrderAvaliations).toHaveLength(0)
  })
})
