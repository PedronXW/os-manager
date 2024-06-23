import { Client } from '@/domain/enterprise/entities/client/client'

export type ClientQueryResponse = {
  clients: Client[]
  clientsQueryCount: number
}

export abstract class ClientRepository {
  abstract createClient(client: Client): Promise<Client>
  abstract updateClient(id: string, newClient: Client): Promise<Client>
  abstract deleteClient(id: string): Promise<void>
  abstract getAllClients(
    page: number,
    limit: number,
  ): Promise<ClientQueryResponse>

  abstract getClientById(id: string): Promise<Client | undefined>
  abstract getClientByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<ClientQueryResponse>

  abstract getClientByEmail(
    email: string,
    page: number,
    limit: number,
  ): Promise<ClientQueryResponse>

  abstract getClientByDocument(
    document: string,
    page: number,
    limit: number,
  ): Promise<ClientQueryResponse>

  abstract getClientByExactlyDocument(
    document: string,
  ): Promise<Client | undefined>
}
