import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { DeleteClientService } from './delete-client'

describe('DeleteClient', () => {
  let sut: DeleteClientService
  let clientRepository: InMemoryClientRepository

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository()
    sut = new DeleteClientService(clientRepository)
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
