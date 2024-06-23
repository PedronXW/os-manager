import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'
import { validateSync } from 'class-validator'
import { EntityType } from '../../events'
import { CreateEntityEvent } from '../../events/CreateEntityEvent'
import { InvalidEntityCreatedEvent } from '../../events/InvalidEntityCreatedEvent'
import { WorkOrderAvaliationValidationRules } from './work-order-avaliation-validator'

type WorkOrderAvaliationProps = {
  workOrderId: EntityId
  rating: number
  comment: string
  active: boolean
  createdAt: Date
  updatedAt?: Date | null
  updatedBy?: EntityId | null
  deletedAt?: Date | null
  deletedBy?: EntityId | null
}

export class WorkOrderAvaliation extends Entity<WorkOrderAvaliationProps> {
  get workOrderId(): EntityId {
    return this.props.workOrderId
  }

  set workOrderId(workOrderId: EntityId) {
    this.props.workOrderId = workOrderId
  }

  get rating(): number {
    return this.props.rating
  }

  set rating(rating: number) {
    this.props.rating = rating
  }

  get comment(): string {
    return this.props.comment
  }

  set comment(comment: string) {
    this.props.comment = comment
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

  get active(): boolean {
    return this.props.active
  }

  set active(active: boolean) {
    this.props.active = active
  }

  static create(
    props: Optional<
      WorkOrderAvaliationProps,
      | 'createdAt'
      | 'active'
      | 'deletedAt'
      | 'updatedAt'
      | 'updatedBy'
      | 'deletedBy'
    >,
    id?: EntityId,
  ): WorkOrderAvaliation {
    const newWorkOrderAvaliation = new WorkOrderAvaliation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        active: props.active ?? true,
      },
      id,
    )

    const validatedWorkOrderAvaliation = new WorkOrderAvaliationValidationRules(
      newWorkOrderAvaliation,
    )

    const validationError = validateSync(validatedWorkOrderAvaliation)

    if (!id) {
      newWorkOrderAvaliation.addDomainEvent(
        new CreateEntityEvent(
          newWorkOrderAvaliation,
          EntityType.WORK_ORDER_AVALIATION,
        ),
      )
    }

    if (validationError.length > 0) {
      newWorkOrderAvaliation.addDomainEvent(
        new InvalidEntityCreatedEvent(
          newWorkOrderAvaliation,
          EntityType.WORK_ORDER_AVALIATION,
          validationError,
        ),
      )
    }

    return newWorkOrderAvaliation
  }
}
