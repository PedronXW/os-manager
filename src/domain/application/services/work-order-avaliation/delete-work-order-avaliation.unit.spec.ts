import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrderAvaliation } from 'test/factories/unit/work-order-avaliation-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { DeleteWorkOrderAvaliationService } from './delete-work-order-avaliation'

describe('DeleteWorkOrderAvaliation', () => {
  let sut: DeleteWorkOrderAvaliationService
  let workOrderAvaliationRepository: InMemoryWorkOrderAvaliationRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderAvaliationRepository = new InMemoryWorkOrderAvaliationRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_AVALIATION_DELETE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new DeleteWorkOrderAvaliationService(
      workOrderAvaliationRepository,
      authorizationService,
    )
  })

  it('should be able delete a work order avaliation', async () => {
    const workOrderAvaliation = await makeWorkOrderAvaliation()

    workOrderAvaliationRepository.createWorkOrderAvaliation(workOrderAvaliation)

    const response = await sut.execute({
      id: workOrderAvaliation.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderAvaliationRepository.workOrderAvaliations).toHaveLength(0)
  })
})
