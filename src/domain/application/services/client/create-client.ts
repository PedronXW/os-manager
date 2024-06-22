import { Client } from '@/domain/enterprise/entities/client'
import { ClientRepository } from '../../repositories/client-repository'

export class CreateClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(client: Client): Promise<Client> {
    return this.clientRepository.createClient(client)
  }
}
