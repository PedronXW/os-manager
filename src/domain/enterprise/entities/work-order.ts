import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

type WorkOrderProps = {
  description: string
  installation: EntityId
  active: boolean
  workOrderResult?: EntityId | null
  createdAt: Date
  createdBy: EntityId
  updatedAt?: Date | null
  updatedBy?: EntityId | null
  deletedAt?: Date | null
  deletedBy?: EntityId | null
}

export class WorkOrder extends Entity<WorkOrderProps> {
  get description(): string {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get installation(): EntityId {
    return this.props.installation
  }

  set installation(installation: EntityId) {
    this.props.installation = installation
  }

  get active(): boolean {
    return this.props.active
  }

  set active(active: boolean) {
    this.props.active = active
  }

  get workOrderResult(): EntityId | null | undefined {
    return this.props.workOrderResult
  }

  set workOrderResult(workOrderResult: EntityId | null | undefined) {
    this.props.workOrderResult = workOrderResult
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
      WorkOrderProps,
      | 'createdAt'
      | 'active'
      | 'deletedAt'
      | 'updatedAt'
      | 'workOrderResult'
      | 'updatedBy'
      | 'deletedBy'
    >,
    id?: EntityId,
  ): WorkOrder {
    const workOrder = new WorkOrder(
      {
        createdAt: props.createdAt ?? new Date(),
        active: props.active ?? true,
        ...props,
      },
      id,
    )

    return workOrder
  }
}
