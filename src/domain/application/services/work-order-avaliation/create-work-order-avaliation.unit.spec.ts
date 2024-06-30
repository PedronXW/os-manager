import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { CreateWorkOrderAvaliationService } from './create-work-order-avaliation'

describe('CreateWorkOrderAvaliation', () => {
  let sut: CreateWorkOrderAvaliationService
  let workOrderAvaliationRepository: InMemoryWorkOrderAvaliationRepository
  let workOrderRepository: InMemoryWorkOrderRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderAvaliationRepository = new InMemoryWorkOrderAvaliationRepository()
    workOrderRepository = new InMemoryWorkOrderRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_AVALIATION_CREATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new CreateWorkOrderAvaliationService(
      workOrderAvaliationRepository,
      workOrderRepository,
      authorizationService,
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
