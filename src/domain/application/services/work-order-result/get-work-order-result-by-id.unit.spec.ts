import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'
import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrderResult } from 'test/factories/unit/work-order-result-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetWorkOrderResultByIdService } from './get-work-order-result-by-id'

describe('GetWorkOrderResultById', () => {
  let sut: GetWorkOrderResultByIdService
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
    sut = new GetWorkOrderResultByIdService(
      workOrderResultRepository,
      authorizationService,
    )
  })

  it('should be able to get all a work order result', async () => {
    const workOrderResult = await makeWorkOrderResult()

    workOrderResultRepository.createWorkOrderResult(workOrderResult)

    const response = await sut.execute({
      id: workOrderResult.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(WorkOrderResult))
    expect(workOrderResultRepository.workOrderResults).toHaveLength(1)
  })
})
