import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { DeleteClientService } from './delete-client'

describe('DeleteClient', () => {
  let sut: DeleteClientService
  let clientRepository: InMemoryClientRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    clientRepository = new InMemoryClientRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.CLIENT_DELETE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new DeleteClientService(clientRepository, authorizationService)
  })

  it('should be able to delete a client', async () => {
    const client = Client.create({
      name: 'Client Name',
      email: 'clientemail@email.com',
      managerName: 'Manager Name',
      document: '123456789',
      contacts: ['contact1', 'contact2'],
      createdBy: new EntityId('creatorId'),
    })

    clientRepository.createClient(client)

    const response = await sut.execute({ id: client.id.getValue() })

    expect(response.isRight()).toBeTruthy()
    expect(clientRepository.clients).toHaveLength(0)
  })
})
