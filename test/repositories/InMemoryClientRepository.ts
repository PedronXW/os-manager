import { DomainEvents } from '@/@shared/events/event-dispatcher'
import { ClientRepository } from '@/domain/application/repositories/client-repository'
import { Client } from '@/domain/enterprise/entities/client/client'

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = []

  async createClient(client: Client): Promise<Client> {
    this.clients.push(client)
    DomainEvents.markEntityForDispatch(client)

    DomainEvents.dispatchEventsForEntity(client.id)
    return client
  }

  async updateClient(id: string, newClient: Client): Promise<Client> {
    const clientIndex = this.clients.findIndex(
      (client) => client.id.getValue() === id,
    )
    this.clients[clientIndex] = newClient
    return newClient
  }

  async deleteClient(id: string): Promise<void> {
    this.clients = this.clients.filter((client) => client.id.getValue() !== id)
  }

  async getAllClients(page: number, limit: number): Promise<Client[]> {
    return this.clients.slice(page * limit, (page + 1) * limit)
  }

  async getClientById(id: string): Promise<Client | undefined> {
    return this.clients.find((client) => client.id.getValue() === id)
  }

  async getClientByName(name: string): Promise<Client | undefined> {
    return this.clients.find((client) => client.name === name)
  }

  async getClientByEmail(email: string): Promise<Client | undefined> {
    return this.clients.find((client) => client.email === email)
  }

  async getClientByDocument(document: string): Promise<Client | undefined> {
    return this.clients.find((client) => client.document === document)
  }
}
