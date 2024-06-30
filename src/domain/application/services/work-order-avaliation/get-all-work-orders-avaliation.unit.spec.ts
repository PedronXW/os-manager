import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrderAvaliation } from 'test/factories/unit/work-order-avaliation-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetAllWorkOrderAvaliationsService } from './get-all-work-orders-avaliation'

describe('GetAllWorkOrderAvaliation', () => {
  let sut: GetAllWorkOrderAvaliationsService
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
    sut = new GetAllWorkOrderAvaliationsService(
      workOrderAvaliationRepository,
      authorizationService,
    )
  })

  it('should be able to get all work order avaliations', async () => {
    const workOrderAvaliation = await makeWorkOrderAvaliation()

    workOrderAvaliationRepository.createWorkOrderAvaliation(workOrderAvaliation)

    const response = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      workOrderAvaliations: expect.any(Array),
      workOrderAvaliationsQueryCount: 1,
    })
    expect(workOrderAvaliationRepository.workOrderAvaliations).toHaveLength(1)
  })
})
