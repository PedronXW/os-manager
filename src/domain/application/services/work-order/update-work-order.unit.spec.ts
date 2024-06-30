import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { UpdateWorkOrderService } from './update-work-order'

describe('UpdateWorkOrder', () => {
  let sut: UpdateWorkOrderService
  let workOrderRepository: InMemoryWorkOrderRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderRepository = new InMemoryWorkOrderRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_UPDATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new UpdateWorkOrderService(workOrderRepository, authorizationService)
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
