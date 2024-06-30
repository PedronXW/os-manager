import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetAllWorkOrdersService } from './get-all-work-orders'

describe('GetAllWorkOrder', () => {
  let sut: GetAllWorkOrdersService
  let workOrderRepository: InMemoryWorkOrderRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderRepository = new InMemoryWorkOrderRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_GET],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new GetAllWorkOrdersService(workOrderRepository, authorizationService)
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
