import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'
import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { CreateWorkOrderResultService } from './create-work-order-result'

describe('CreateWorkOrderResult', () => {
  let sut: CreateWorkOrderResultService
  let workOrderResultRepository: InMemoryWorkOrderResultRepository
  let workOrderRepository: InMemoryWorkOrderRepository

  beforeEach(() => {
    workOrderResultRepository = new InMemoryWorkOrderResultRepository()
    workOrderRepository = new InMemoryWorkOrderRepository()
    sut = new CreateWorkOrderResultService(
      workOrderResultRepository,
      workOrderRepository,
    )
  })

  it('should be able to create a work order result', async () => {
    const workOrder = makeWorkOrder()

    workOrderRepository.createWorkOrder(workOrder)

    const response = await sut.execute({
      description: 'a',
      price: 10,
      workOrderId: workOrder.id.getValue(),
      createdBy: 'a',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(WorkOrderResult))
    expect(workOrderResultRepository.workOrderResults).toHaveLength(1)
  })
})
