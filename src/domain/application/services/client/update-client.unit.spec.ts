import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { UpdateClientService } from './update-client'

describe('UpdateClient', () => {
  let sut: UpdateClientService
  let clientRepository: InMemoryClientRepository

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository()
    sut = new UpdateClientService(clientRepository)
  })

  it('should be able to update a client', async () => {
    const client = Client.create({
      name: 'Client Name',
      email: 'clientemail@email.com',
      managerName: 'Manager Name',
      document: '123456789',
      contacts: ['contact1', 'contact2'],
      createdBy: new EntityId('creatorId'),
    })

    clientRepository.createClient(client)

    const response = await sut.execute({
      id: client.id.getValue(),
      name: 'arroz',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value.name).toEqual('arroz')
    expect(clientRepository.clients[0].name).toEqual('arroz')
  })
})
