import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'

export function makeClient(override: Partial<Client> = {}, id?: EntityId) {
  const client = Client.create(
    {
      name: 'any_name',
      email: 'any_email',
      contacts: [],
      createdBy: new EntityId('a'),
      document: 'axcscas',
      managerName: 'csacsad',
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return client
}
