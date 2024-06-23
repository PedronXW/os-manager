import { DomainEvents } from '@/@shared/events/event-dispatcher'
import {
  ClientQueryResponse,
  ClientRepository,
} from '@/domain/application/repositories/client-repository'
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

  async getAllClients(
    page: number,
    limit: number,
  ): Promise<ClientQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      clients: this.clients.slice(startIndex, endIndex),
      clientsQueryCount: this.clients.length,
    }
  }

  async getClientById(id: string): Promise<Client | undefined> {
    return this.clients.find((client) => client.id.getValue() === id)
  }

  async getClientByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<ClientQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    const clients = this.clients.filter((client) => client.name.includes(name))

    return {
      clients: clients.slice(startIndex, endIndex),
      clientsQueryCount: clients.length,
    }
  }

  async getClientByEmail(
    email: string,
    page: number,
    limit: number,
  ): Promise<ClientQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit
    const clients = await this.clients.filter((client) =>
      client.email.includes(email),
    )

    return {
      clients: clients.slice(startIndex, endIndex),
      clientsQueryCount: clients.length,
    }
  }

  async getClientByDocument(
    document: string,
    page: number,
    limit: number,
  ): Promise<ClientQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit
    const clients = await this.clients.filter((client) =>
      client.document.includes(document),
    )

    return {
      clients: clients.slice(startIndex, endIndex),
      clientsQueryCount: clients.length,
    }
  }

  async getClientByExactlyDocument(
    document: string,
  ): Promise<Client | undefined> {
    return await this.clients.find((client) => client.document === document)
  }
}
