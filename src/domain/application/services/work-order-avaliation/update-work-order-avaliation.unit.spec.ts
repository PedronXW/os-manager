import { makeWorkOrderAvaliation } from 'test/factories/unit/work-order-avaliation-factory'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { UpdateWorkOrderAvaliationService } from './update-work-order-avaliation'

describe('UpdateWorkOrderAvaliation', () => {
  let sut: UpdateWorkOrderAvaliationService
  let workOrderAvaliationRepository: InMemoryWorkOrderAvaliationRepository

  beforeEach(() => {
    workOrderAvaliationRepository = new InMemoryWorkOrderAvaliationRepository()
    sut = new UpdateWorkOrderAvaliationService(workOrderAvaliationRepository)
  })

  it('should be able to update a work order avaliation', async () => {
    const workOrderAvaliation = await makeWorkOrderAvaliation()

    workOrderAvaliationRepository.createWorkOrderAvaliation(workOrderAvaliation)

    const response = await sut.execute({
      id: workOrderAvaliation.id.getValue(),
      comment: 'arroz-doce',
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderAvaliationRepository.workOrderAvaliations).toHaveLength(1)
    expect(
      workOrderAvaliationRepository.workOrderAvaliations[0].comment,
    ).toEqual('arroz-doce')
  })
})
