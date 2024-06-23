import { DomainEvents } from '@/@shared/events/event-dispatcher'
import { EventHandler } from '@/@shared/events/event-handler'
import { CreateEntityEvent } from '@/domain/enterprise/events/CreateEntityEvent'

export class OnEntityCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewEntityNotification.bind(this),
      CreateEntityEvent.name,
    )
  }

  private async sendNewEntityNotification({ entity }: CreateEntityEvent) {
    console.log(entity)
  }
}
