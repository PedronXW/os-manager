import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'
import { validateSync } from 'class-validator'
import { Permission } from '../../../application/permissions/permissions'
import { EntityType } from '../../events'
import { CreateEntityEvent } from '../../events/CreateEntityEvent'
import { InvalidEntityCreatedEvent } from '../../events/InvalidEntityCreatedEvent'
import { RoleValidationRules } from './role-validator'

type RoleProps = {
  name: string
  description: string
  permissions: Permission[]
  active: boolean
  createdAt: Date
  createdBy: EntityId
  updatedAt?: Date | null
  updatedBy?: EntityId | null
  deletedAt?: Date | null
  deletedBy?: EntityId | null
}

export class Role extends Entity<RoleProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description(): string {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get permissions(): Permission[] {
    return this.props.permissions
  }

  set permissions(permissions: Permission[]) {
    this.props.permissions = permissions
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
      RoleProps,
      | 'createdAt'
      | 'deletedAt'
      | 'deletedBy'
      | 'updatedAt'
      | 'updatedBy'
      | 'active'
    >,
    id?: EntityId,
  ): Role {
    const newRole = new Role(
      {
        ...props,
        active: props.active ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const validatedRole = new RoleValidationRules(newRole)

    const validationError = validateSync(validatedRole)

    if (!id) {
      newRole.addDomainEvent(new CreateEntityEvent(newRole, EntityType.ROLE))
    }

    if (validationError.length > 0) {
      newRole.addDomainEvent(
        new InvalidEntityCreatedEvent(
          newRole,
          EntityType.ROLE,
          validationError,
        ),
      )
    }

    return newRole
  }
}
