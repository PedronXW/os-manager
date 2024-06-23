import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'
import { validateSync } from 'class-validator'
import { EntityType } from '../../events'
import { CreateEntityEvent } from '../../events/CreateEntityEvent'
import { InvalidEntityCreatedEvent } from '../../events/InvalidEntityCreatedEvent'
import { ClientValidationRules } from './client-validator'

type ClientRequest = {
  name: string
  contacts: string[]
  managerName: string
  document: string
  email: string
  active: boolean
  createdAt: Date
  createdBy: EntityId
  updatedAt?: Date | null
  updatedBy?: EntityId | null
  deletedAt?: Date | null
  deletedBy?: EntityId | null
}

export class Client extends Entity<ClientRequest> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get contacts(): string[] {
    return this.props.contacts
  }

  set contacts(contacts: string[]) {
    this.props.contacts = contacts
  }

  get managerName(): string {
    return this.props.managerName
  }

  set managerName(managerName: string) {
    this.props.managerName = managerName
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get document(): string {
    return this.props.document
  }

  set document(document: string) {
    this.props.document = document
  }

  get active(): boolean {
    return this.props.active
  }

  set active(active: boolean) {
    this.props.active = active
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  get createdBy(): EntityId {
    return this.props.createdBy
  }

  set createdBy(createdBy: EntityId) {
    this.props.createdBy = createdBy
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date | null | undefined) {
    this.props.updatedAt = updatedAt
  }

  get updatedBy(): EntityId | null | undefined {
    return this.props.updatedBy
  }

  set updatedBy(updatedBy: EntityId | null | undefined) {
    this.props.updatedBy = updatedBy
  }

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  set deletedAt(deletedAt: Date | null | undefined) {
    this.props.deletedAt = deletedAt
  }

  get deletedBy(): EntityId | null | undefined {
    return this.props.deletedBy
  }

  set deletedBy(deletedBy: EntityId | null | undefined) {
    this.props.deletedBy = deletedBy
  }

  static create(
    props: Optional<
      ClientRequest,
      | 'createdAt'
      | 'deletedAt'
      | 'deletedBy'
      | 'updatedAt'
      | 'updatedBy'
      | 'active'
    >,
    id?: EntityId,
  ): Client {
    const newClient = new Client(
      {
        ...props,
        active: props.active ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const validatedClient = new ClientValidationRules(newClient)

    const validationError = validateSync(validatedClient)

    if (!id) {
      newClient.addDomainEvent(
        new CreateEntityEvent(newClient, EntityType.CLIENT),
      )
    }

    if (validationError.length > 0) {
      newClient.addDomainEvent(
        new InvalidEntityCreatedEvent(
          newClient,
          EntityType.CLIENT,
          validationError,
        ),
      )
    }

    return newClient
  }
}
