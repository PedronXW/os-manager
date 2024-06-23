import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { DomainEvent } from '@/@shared/events/domain-event'
import { EntityType } from '.'

export class CreateEntityEvent implements DomainEvent {
  public ocurredAt: Date
  public entity: Entity<unknown>
  public entityType: EntityType

  constructor(entity: Entity<unknown>, entityType: EntityType) {
    this.ocurredAt = new Date()
    this.entity = entity
    this.entityType = entityType
  }

  getEntityId(): EntityId {
    return this.entity.id
  }
}
