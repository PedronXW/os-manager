import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrderResult } from 'test/factories/unit/work-order-result-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { DeleteWorkOrderResultService } from './delete-work-order-result'

describe('DeleteWorkOrderResult', () => {
  let sut: DeleteWorkOrderResultService
  let workOrderResultRepository: InMemoryWorkOrderResultRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderResultRepository = new InMemoryWorkOrderResultRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_RESULT_DELETE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new DeleteWorkOrderResultService(
      workOrderResultRepository,
      authorizationService,
    )
  })

  it('should be able to delete a work order result', async () => {
    const workOrderResult = await makeWorkOrderResult()

    workOrderResultRepository.createWorkOrderResult(workOrderResult)

    const response = await sut.execute({
      id: workOrderResult.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderResultRepository.workOrderResults).toHaveLength(0)
  })
})
