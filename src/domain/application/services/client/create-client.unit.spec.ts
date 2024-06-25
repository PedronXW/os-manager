import { Client } from '@/domain/enterprise/entities/client/client'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { CreateClientService } from './create-client'

describe('CreateClient', () => {
  let sut: CreateClientService
  let clientRepository: InMemoryClientRepository

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository()
    sut = new CreateClientService(clientRepository)
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

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(Client))
    expect(clientRepository.clients).toHaveLength(1)
  })
})
