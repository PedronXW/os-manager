import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'
import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { GetWorkOrderByIdService } from './get-work-order-by-id'

describe('GetWorkOrderById', () => {
  let sut: GetWorkOrderByIdService
  let workOrderRepository: InMemoryWorkOrderRepository

  beforeEach(() => {
    workOrderRepository = new InMemoryWorkOrderRepository()
    sut = new GetWorkOrderByIdService(workOrderRepository)
  })

  it('should be able to get a work order by id', async () => {
    const workorder = await makeWorkOrder()

    workOrderRepository.createWorkOrder(workorder)

    const response = await sut.execute({
      id: workorder.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(WorkOrder))
    expect(workOrderRepository.workOrders).toHaveLength(1)
  })
})
