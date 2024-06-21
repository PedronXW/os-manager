import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

type InstallationProps = {
  name: string
  description: string
  contacts: string[]
  managerName: string
  products: EntityId[]
  active: boolean
  createdAt: Date
  createdBy: EntityId
  updatedAt?: Date | null
  updatedBy?: EntityId | null
  deletedAt?: Date | null
  deletedBy?: EntityId | null
}

export class Installation extends Entity<InstallationProps> {
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

  get products(): EntityId[] {
    return this.props.products
  }

  set products(products: EntityId[]) {
    this.props.products = products
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
      InstallationProps,
      'createdAt' | 'deletedAt' | 'deletedBy' | 'updatedAt' | 'updatedBy'
    >,
    id?: EntityId,
  ): Installation {
    return new Installation(
      {
        ...props,
        active: props.active ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}