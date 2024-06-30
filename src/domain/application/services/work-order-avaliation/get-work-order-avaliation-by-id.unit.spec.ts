import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrderAvaliation } from 'test/factories/unit/work-order-avaliation-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetWorkOrderAvaliationByIdService } from './get-work-order-avaliation-by-id'

describe('GetWorkOrderAvaliationById', () => {
  let sut: GetWorkOrderAvaliationByIdService
  let workOrderAvaliationRepository: InMemoryWorkOrderAvaliationRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderAvaliationRepository = new InMemoryWorkOrderAvaliationRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_AVALIATION_GET],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new GetWorkOrderAvaliationByIdService(
      workOrderAvaliationRepository,
      authorizationService,
    )
  })

  it('should be able to get a work order avaliation by id', async () => {
    const workOrderAvaliation = await makeWorkOrderAvaliation()

    workOrderAvaliationRepository.createWorkOrderAvaliation(workOrderAvaliation)

    const response = await sut.execute({
      id: workOrderAvaliation.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(WorkOrderAvaliation))
    expect(workOrderAvaliationRepository.workOrderAvaliations).toHaveLength(1)
  })
})
