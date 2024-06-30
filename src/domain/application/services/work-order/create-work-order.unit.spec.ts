import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'
import { makeInstallation } from 'test/factories/unit/installation-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryInstallationRepository } from 'test/repositories/InMemoryInstallationRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderRepository } from 'test/repositories/InMemoryWorkOrderRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { CreateWorkOrderService } from './create-work-order'

describe('CreateWorkOrder', () => {
  let sut: CreateWorkOrderService
  let workOrderRepository: InMemoryWorkOrderRepository
  let installationRepository: InMemoryInstallationRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderRepository = new InMemoryWorkOrderRepository()
    installationRepository = new InMemoryInstallationRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_CREATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new CreateWorkOrderService(
      workOrderRepository,
      installationRepository,
      authorizationService,
    )
  })

  it('should be able to create a work order', async () => {
    const installation = makeInstallation()

    installationRepository.createInstallation(installation)

    const response = await sut.execute({
      installation: installation.id.getValue(),
      description: 'arroz',
      creatorId: 'creatorId',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(WorkOrder))
    expect(workOrderRepository.workOrders).toHaveLength(1)
  })
})
