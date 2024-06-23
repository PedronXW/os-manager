import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { DomainEvent } from '@/@shared/events/domain-event'
import { ValidationError } from 'class-validator'
import { EntityType } from '.'

export class InvalidEntityCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public entity: Entity<unknown>
  public errors: ValidationError[]
  public entityType: EntityType

  constructor(
    entity: Entity<unknown>,
    entityType: EntityType,
    errors: ValidationError[],
  ) {
    this.ocurredAt = new Date()
    this.entityType = entityType
    this.entity = entity
    this.errors = errors
  }

  getEntityId(): EntityId {
    return this.entity.id
  }
}
