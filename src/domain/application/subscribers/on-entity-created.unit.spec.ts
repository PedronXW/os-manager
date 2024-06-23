import { makeClient } from 'test/factories/unit/client-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { OnEntityCreated } from './on-entity-created'

let inMemoryClientRepository: InMemoryClientRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
  })

  it('should  send a notification when an answer is created', async () => {
    new OnEntityCreated()

    const client = makeClient()

    inMemoryClientRepository.createClient(client)
  })
})
