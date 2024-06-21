import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

type WorkOrderAvaliationProps = {
  workOrderId: string
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
  get workOrderId(): string {
    return this.props.workOrderId
  }

  set workOrderId(workOrderId: string) {
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

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  set deletedAt(deletedAt: Date | null | undefined) {
    this.props.deletedAt = deletedAt
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
    return new WorkOrderAvaliation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        active: props.active ?? true,
      },
      id,
    )
  }
}
