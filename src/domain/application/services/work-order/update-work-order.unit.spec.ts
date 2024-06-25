import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { UpdateWorkOrderService } from './update-work-order'

describe('UpdateWorkOrder', () => {
  let sut: UpdateWorkOrderService
  let workOrderRepository: InMemoryWorkOrderRepository

  beforeEach(() => {
    workOrderRepository = new InMemoryWorkOrderRepository()
    sut = new UpdateWorkOrderService(workOrderRepository)
  })

  it('should be able to update a work order', async () => {
    const workorder = await makeWorkOrder()

    workOrderRepository.createWorkOrder(workorder)

    const response = await sut.execute({
      id: workorder.id.getValue(),
      description: 'arroz-doce',
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderRepository.workOrders).toHaveLength(1)
    expect(workOrderRepository.workOrders[0].description).toEqual('arroz-doce')
  })
})
