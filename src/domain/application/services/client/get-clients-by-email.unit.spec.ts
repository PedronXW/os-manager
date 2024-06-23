import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { GetClientsByEmailService } from './get-clients-by-email'

describe('GetClientsByEmail', () => {
  let sut: GetClientsByEmailService
  let clientRepository: InMemoryClientRepository

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository()
    sut = new GetClientsByEmailService(clientRepository)
  })

  it('should be able to get clients by email', async () => {
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
      email: client.email,
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      clients: expect.any(Array),
      clientsQueryCount: 1,
    })
    expect(clientRepository.clients).toHaveLength(1)
  })
})
