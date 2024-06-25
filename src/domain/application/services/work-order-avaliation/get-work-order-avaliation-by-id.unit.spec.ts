import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { makeWorkOrderAvaliation } from 'test/factories/unit/work-order-avaliation-factory'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { GetWorkOrderAvaliationByIdService } from './get-work-order-avaliation-by-id'

describe('GetWorkOrderAvaliationById', () => {
  let sut: GetWorkOrderAvaliationByIdService
  let workOrderAvaliationRepository: InMemoryWorkOrderAvaliationRepository

  beforeEach(() => {
    workOrderAvaliationRepository = new InMemoryWorkOrderAvaliationRepository()
    sut = new GetWorkOrderAvaliationByIdService(workOrderAvaliationRepository)
  })

  it('should be able to get a work order avaliation by id', async () => {
    const workOrderAvaliation = await makeWorkOrderAvaliation()

    workOrderAvaliationRepository.createWorkOrderAvaliation(workOrderAvaliation)

    const response = await sut.execute({
      id: workOrderAvaliation.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(WorkOrderAvaliation))
    expect(workOrderAvaliationRepository.workOrderAvaliations).toHaveLength(1)
  })
})
