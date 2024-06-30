import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'
import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetWorkOrderByIdService } from './get-work-order-by-id'

describe('GetWorkOrderById', () => {
  let sut: GetWorkOrderByIdService
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
    sut = new GetWorkOrderByIdService(workOrderRepository, authorizationService)
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
