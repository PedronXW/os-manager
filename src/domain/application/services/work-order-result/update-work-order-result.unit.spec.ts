import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrderResult } from 'test/factories/unit/work-order-result-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderResultRepository } from 'test/repositories/InMemoryWorkOrderResultRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { UpdateWorkOrderResultService } from './update-work-order-result'

describe('UpdateWorkOrderResult', () => {
  let sut: UpdateWorkOrderResultService
  let workOrderResultRepository: InMemoryWorkOrderResultRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderResultRepository = new InMemoryWorkOrderResultRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_RESULT_UPDATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new UpdateWorkOrderResultService(
      workOrderResultRepository,
      authorizationService,
    )
  })

  it('should be able to update a work order result', async () => {
    const workOrderResult = await makeWorkOrderResult()

    workOrderResultRepository.createWorkOrderResult(workOrderResult)

    const response = await sut.execute({
      id: workOrderResult.id.getValue(),
      description: 'arroz-doce',
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderResultRepository.workOrderResults).toHaveLength(1)
    expect(workOrderResultRepository.workOrderResults[0].description).toEqual(
      'arroz-doce',
    )
  })
})
