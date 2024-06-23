import { Client } from '@/domain/enterprise/entities/client/client';

export abstract class ClientRepository {
  abstract createClient(client: Client): Promise<Client>
  abstract updateClient(id: string, newClient: Client): Promise<Client>
  abstract deleteClient(id: string): Promise<void>
  abstract getAllClients(page: number, limit: number): Promise<Client[]>
  abstract getClientById(id: string): Promise<Client | undefined>
  abstract getClientByName(name: string): Promise<Client | undefined>
  abstract getClientByEmail(email: string): Promise<Client | undefined>
  abstract getClientByDocument(document: string): Promise<Client | undefined>
}
