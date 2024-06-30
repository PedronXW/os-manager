import { Client } from '@/domain/enterprise/entities/client/client'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { CreateClientService } from './create-client'

describe('CreateClient', () => {
  let sut: CreateClientService
  let clientRepository: InMemoryClientRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    clientRepository = new InMemoryClientRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.CLIENT_CREATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new CreateClientService(clientRepository, authorizationService)
  })

  it('should be able to create a client', async () => {
    const response = await sut.execute({
      name: 'Client Name',
      email: 'clientemail@email.com',
      managerName: 'Manager Name',
      document: '123456789',
      contacts: ['contact1', 'contact2'],
      creatorId: 'creatorId',
    })

    console.log(response.value)

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(Client))
    expect(clientRepository.clients).toHaveLength(1)
  })
})
