import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { GetClientsByDocumentService } from './get-clients-by-document'

describe('GetClientByDocument', () => {
  let sut: GetClientsByDocumentService
  let clientRepository: InMemoryClientRepository

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository()
    sut = new GetClientsByDocumentService(clientRepository)
  })

  it('should be able to get clients by document', async () => {
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
      document: client.document,
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
