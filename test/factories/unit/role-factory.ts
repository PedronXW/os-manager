import { EntityId } from '@/@shared/entities/entity-id'
import { Role } from '@/domain/enterprise/entities/role/role'

export function makeRole(override: Partial<Role> = {}, id?: EntityId) {
  const role = Role.create(
    {
      name: 'any_name',
      description: 'arroz',
      permissions: [],
      createdBy: new EntityId('a'),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return role
}
