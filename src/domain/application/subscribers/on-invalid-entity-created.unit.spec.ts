import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { OnInvalidEntityCreated } from './on-invalid-entity-created'

let inMemoryClientRepository: InMemoryClientRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
  })

  it('should  send a notification when an answer is created', async () => {
    new OnInvalidEntityCreated()

    const client = Client.create({
      contacts: [],
      document: '165',
      email: 'pedroalme',
      name: 'cascds',
      managerName: 'cdsacsad',
      createdBy: new EntityId('a'),
    })

    inMemoryClientRepository.createClient(client)
  })
})
