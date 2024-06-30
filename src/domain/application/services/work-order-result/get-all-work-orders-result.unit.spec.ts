import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrderResult } from 'test/factories/unit/work-order-result-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetAllWorkOrderResultsService } from './get-all-work-orders-result'

describe('GetAllWorkOrderResult', () => {
  let sut: GetAllWorkOrderResultsService
  let workOrderResultRepository: InMemoryWorkOrderResultRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderResultRepository = new InMemoryWorkOrderResultRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_RESULT_GET],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new GetAllWorkOrderResultsService(
      workOrderResultRepository,
      authorizationService,
    )
  })

  it('should be able to get all work order results', async () => {
    const workOrderResult = await makeWorkOrderResult()

    workOrderResultRepository.createWorkOrderResult(workOrderResult)

    const response = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      workOrderResults: expect.any(Array),
      workOrderResultsQueryCount: 1,
    })
    expect(workOrderResultRepository.workOrderResults).toHaveLength(1)
  })
})
