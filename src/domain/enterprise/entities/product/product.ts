import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'
import { validateSync } from 'class-validator'
import { EntityType } from '../../events'
import { CreateEntityEvent } from '../../events/CreateEntityEvent'
import { InvalidEntityCreatedEvent } from '../../events/InvalidEntityCreatedEvent'
import { ProductValidationRules } from './product-validator'

type ProductProps = {
  name: string
  description: string
  code: string
  fabricator: string
  price: number
  active: boolean
  createdAt: Date
  createdBy: EntityId
  updatedAt?: Date | null
  updatedBy?: EntityId | null
  deletedAt?: Date | null
  deletedBy?: EntityId | null
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
  }

  get code() {
    return this.props.code
  }

  set code(value: string) {
    this.props.code = value
  }

  get fabricator() {
    return this.props.fabricator
  }

  set fabricator(value: string) {
    this.props.fabricator = value
  }

  get price() {
    return this.props.price
  }

  set price(value: number) {
    this.props.price = value
  }

  get active() {
    return this.props.active
  }

  set active(value: boolean) {
    this.props.active = value
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(value: Date) {
    this.props.createdAt = value
  }

  get createdBy() {
    return this.props.createdBy
  }

  set createdBy(value: EntityId) {
    this.props.createdBy = value
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  set updatedAt(value: Date | null) {
    this.props.updatedAt = value
  }

  get updatedBy(): EntityId | null | undefined {
    return this.props.updatedBy
  }

  set updatedBy(value: EntityId | null) {
    this.props.updatedBy = value
  }

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  set deletedAt(value: Date | null) {
    this.props.deletedAt = value
  }

  get deletedBy(): EntityId | null | undefined {
    return this.props.deletedBy
  }

  set deletedBy(value: EntityId | null) {
    this.props.deletedBy = value
  }

  static create(
    props: Optional<
      ProductProps,
      | 'createdAt'
      | 'active'
      | 'deletedAt'
      | 'updatedAt'
      | 'updatedBy'
      | 'deletedBy'
    >,
    id?: EntityId,
  ): Product {
    const newProduct = new Product(
      {
        ...props,
        active: props.active ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const validatedProduct = new ProductValidationRules(newProduct)

    const validationError = validateSync(validatedProduct)

    if (!id) {
      newProduct.addDomainEvent(
        new CreateEntityEvent(newProduct, EntityType.PRODUCT),
      )
    }

    if (validationError.length > 0) {
      newProduct.addDomainEvent(
        new InvalidEntityCreatedEvent(
          newProduct,
          EntityType.PRODUCT,
          validationError,
        ),
      )
    }

    return newProduct
  }
}
