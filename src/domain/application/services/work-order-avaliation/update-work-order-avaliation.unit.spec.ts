import { makeUser } from 'test/factories/unit/user-factory'
import { makeWorkOrderAvaliation } from 'test/factories/unit/work-order-avaliation-factory'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { InMemoryWorkOrderAvaliationRepository } from 'test/repositories/InMemoryWorkOrderAvaliationRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { UpdateWorkOrderAvaliationService } from './update-work-order-avaliation'

describe('UpdateWorkOrderAvaliation', () => {
  let sut: UpdateWorkOrderAvaliationService
  let workOrderAvaliationRepository: InMemoryWorkOrderAvaliationRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    workOrderAvaliationRepository = new InMemoryWorkOrderAvaliationRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.WORK_ORDER_AVALIATION_UPDATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new UpdateWorkOrderAvaliationService(
      workOrderAvaliationRepository,
      authorizationService,
    )
  })

  it('should be able to update a work order avaliation', async () => {
    const workOrderAvaliation = await makeWorkOrderAvaliation()

    workOrderAvaliationRepository.createWorkOrderAvaliation(workOrderAvaliation)

    const response = await sut.execute({
      id: workOrderAvaliation.id.getValue(),
      comment: 'arroz-doce',
    })

    expect(response.isRight()).toBeTruthy()
    expect(workOrderAvaliationRepository.workOrderAvaliations).toHaveLength(1)
    expect(
      workOrderAvaliationRepository.workOrderAvaliations[0].comment,
    ).toEqual('arroz-doce')
  })
})
