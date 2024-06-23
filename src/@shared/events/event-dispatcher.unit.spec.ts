import { Entity } from '../entities/entity'
import { EntityId } from '../entities/entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './event-dispatcher'

class CustomEntityCreated implements DomainEvent {
  public ocurredAt: Date
  private entity: CustomEntity // eslint-disable-line

  constructor(entity: CustomEntity) {
    this.entity = entity
    this.ocurredAt = new Date()
  }

  public getEntityId(): EntityId {
    return this.entity.id
  }
}

class CustomEntity extends Entity<null> {
  static create() {
    const entity = new CustomEntity(null)

    entity.addDomainEvent(new CustomEntityCreated(entity))

    return entity
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', async () => {
    const callbackSpy = jest.fn()
    DomainEvents.register(callbackSpy, CustomEntityCreated.name)
    const entity = CustomEntity.create()
    DomainEvents.markEntityForDispatch(entity)
    expect(entity.domainEvents).toHaveLength(1)
    DomainEvents.dispatchEventsForEntity(entity.id)
    expect(callbackSpy).toHaveBeenCalled()
    expect(entity.domainEvents).toHaveLength(0)
  })
})
