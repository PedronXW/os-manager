import { DomainEvents } from '@/@shared/events/event-dispatcher'
import { EventHandler } from '@/@shared/events/event-handler'
import { InvalidEntityCreatedEvent } from '@/domain/enterprise/events/InvalidEntityCreatedEvent'

export class OnInvalidEntityCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewInvalidEntityNotification.bind(this),
      InvalidEntityCreatedEvent.name,
    )
  }

  private async sendNewInvalidEntityNotification({
    entity,
    errors,
  }: InvalidEntityCreatedEvent) {
    console.log(entity, errors)
  }
}
