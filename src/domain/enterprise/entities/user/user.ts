import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'
import { validateSync } from 'class-validator'
import { EntityType } from '../../events'
import { CreateEntityEvent } from '../../events/CreateEntityEvent'
import { InvalidEntityCreatedEvent } from '../../events/InvalidEntityCreatedEvent'
import { UserValidationRules } from './user-validator'

type UserProps = {
  name: string
  email: string
  active: boolean
  password: string
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
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

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date | null | undefined) {
    this.props.updatedAt = updatedAt
  }

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  set deletedAt(deletedAt: Date | null | undefined) {
    this.props.deletedAt = deletedAt
  }

  static create(
    props: Optional<
      UserProps,
      'createdAt' | 'active' | 'deletedAt' | 'updatedAt'
    >,
    id?: EntityId,
  ): User {
    const newUser = new User(
      {
        ...props,
        active: props.active ?? true,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
        deletedAt: props.deletedAt ?? null,
      },
      id,
    )

    const validatedUser = new UserValidationRules(newUser)

    const validationError = validateSync(validatedUser)

    if (!id) {
      newUser.addDomainEvent(new CreateEntityEvent(newUser, EntityType.USER))
    }

    if (validationError.length > 0) {
      newUser.addDomainEvent(
        new InvalidEntityCreatedEvent(
          newUser,
          EntityType.USER,
          validationError,
        ),
      )
    }

    return newUser
  }
}
