import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

type WorkOrderResultProps = {
  workOrderId: EntityId
  workOrderAvaliation?: EntityId | null
  prize: number
  description: string
  active: boolean
  createdAt: Date
  createdBy: string
  updatedAt?: Date | null
  updatedBy?: EntityId | null
  deletedBy?: EntityId | null
  deletedAt?: Date | null
}

export class WorkOrderResult extends Entity<WorkOrderResultProps> {
  get workOrderId() {
    return this.props.workOrderId
  }

  set workOrderId(value: EntityId) {
    this.props.workOrderId = value
  }

  get workOrderAvaliation(): EntityId | null | undefined {
    return this.props.workOrderAvaliation
  }

  set workOrderAvaliation(value: EntityId | null) {
    this.props.workOrderAvaliation = value
  }

  get prize() {
    return this.props.prize
  }

  set prize(value: number) {
    this.props.prize = value
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
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

  set createdBy(value: string) {
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

  get deletedBy(): EntityId | null | undefined {
    return this.props.deletedBy
  }

  set deletedBy(value: EntityId | null) {
    this.props.deletedBy = value
  }

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  set deletedAt(value: Date | null) {
    this.props.deletedAt = value
  }

  static create(
    props: Optional<
      WorkOrderResultProps,
      | 'createdAt'
      | 'active'
      | 'deletedAt'
      | 'updatedAt'
      | 'workOrderAvaliation'
      | 'updatedBy'
      | 'deletedBy'
    >,
    id?: EntityId,
  ): WorkOrderResult {
    return new WorkOrderResult(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        active: props.active ?? true,
      },
      id,
    )
  }
}
