import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'
import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrder } from 'test/factories/unit/work-order-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { CreateWorkOrderResultService } from './create-work-order-result'

describe('CreateWorkOrderResult', () => {
  let sut: CreateWorkOrderResultService
  let workOrderResultRepository: InMemoryWorkOrderResultRepository
  let workOrderRepository: InMemoryWorkOrderRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderResultRepository = new InMemoryWorkOrderResultRepository()
    workOrderRepository = new InMemoryWorkOrderRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_RESULT_CREATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new CreateWorkOrderResultService(
      workOrderResultRepository,
      workOrderRepository,
      authorizationService,
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
