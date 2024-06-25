import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { DeleteWorkOrderService } from './delete-work-order'

describe('DeleteWorkOrder', () => {
  let sut: DeleteWorkOrderService
  let workOrderRepository: InMemoryWorkOrderRepository

  beforeEach(() => {
    workOrderRepository = new InMemoryWorkOrderRepository()
    sut = new DeleteWorkOrderService(workOrderRepository)
  })

  it('should be able to delete a work order', async () => {
    const workOrder = await makeWorkOrder()

    workOrderRepository.createWorkOrder(workOrder)

    const response = await sut.execute({
      id: workOrder.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderRepository.workOrders).toHaveLength(0)
  })
})
