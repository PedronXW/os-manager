import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { CreateWorkOrderAvaliationService } from './create-work-order-avaliation'

describe('CreateWorkOrderAvaliation', () => {
  let sut: CreateWorkOrderAvaliationService
  let workOrderAvaliationRepository: InMemoryWorkOrderAvaliationRepository
  let workOrderRepository: InMemoryWorkOrderRepository

  beforeEach(() => {
    workOrderAvaliationRepository = new InMemoryWorkOrderAvaliationRepository()
    workOrderRepository = new InMemoryWorkOrderRepository()
    sut = new CreateWorkOrderAvaliationService(
      workOrderAvaliationRepository,
      workOrderRepository,
    )
  })

  it('should be able to create a work order avaliation', async () => {
    const workOrder = makeWorkOrder()

    workOrderRepository.createWorkOrder(workOrder)

    const response = await sut.execute({
      comment: 'a',
      rating: 10,
      workOrderId: workOrder.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(WorkOrderAvaliation))
    expect(workOrderAvaliationRepository.workOrderAvaliations).toHaveLength(1)
  })
})
