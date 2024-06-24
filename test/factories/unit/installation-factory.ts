import { EntityId } from '@/@shared/entities/entity-id'
import { Installation } from '@/domain/enterprise/entities/installation/installation'

export function makeInstallation(
  override: Partial<Installation> = {},
  id?: EntityId,
) {
  const installation = Installation.create(
    {
      name: 'any_name',
      description: 'arroz',
      client: new EntityId('a'),
      createdBy: new EntityId('a'),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return installation
}
