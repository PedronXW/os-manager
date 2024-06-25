import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { GetAllWorkOrdersService } from './get-all-work-orders'

describe('GetAllWorkOrder', () => {
  let sut: GetAllWorkOrdersService
  let workOrderRepository: InMemoryWorkOrderRepository

  beforeEach(() => {
    workOrderRepository = new InMemoryWorkOrderRepository()
    sut = new GetAllWorkOrdersService(workOrderRepository)
  })

  it('should be able to get all a work orders', async () => {
    const workOrder = await makeWorkOrder()

    workOrderRepository.createWorkOrder(workOrder)

    const response = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      workOrders: expect.any(Array),
      workOrdersQueryCount: 1,
    })
    expect(workOrderRepository.workOrders).toHaveLength(1)
  })
})
