import { EntityId } from '@/@shared/entities/entity-id'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  Length,
  ValidateNested,
} from 'class-validator'
import 'reflect-metadata'
import { WorkOrder } from './work-order'

export class WorkOrderValidationRules {
  @Length(3, 255, {
    message: 'Description must be between 3 and 255 characters',
  })
  description: string

  @ValidateNested({ each: true })
  @Type(() => EntityId)
  installation: EntityId

  @ValidateNested({ each: true })
  @Type(() => EntityId)
  @IsOptional()
  workOrderResult?: EntityId | null

  @IsBoolean({ message: 'Active must be a boolean' })
  active: boolean

  @IsDateString(
    { strict: true },
    { message: 'Created at must be a valid date' },
  )
  createdAt: Date

  @ValidateNested({ each: true })
  @Type(() => EntityId)
  createdBy: EntityId

  @IsDateString(
    { strict: true },
    { message: 'updated at must be a valid date' },
  )
  @IsOptional()
  updatedAt?: Date | null

  @ValidateNested({ each: true })
  @Type(() => EntityId)
  @IsOptional()
  updatedBy?: EntityId | null

  @IsDateString({ strict: true }, { message: 'deletedAt must be a valid date' })
  @IsOptional()
  deletedAt?: Date | null

  @ValidateNested({ each: true })
  @Type(() => EntityId)
  @IsOptional()
  deletedBy?: EntityId | null

  constructor(props: WorkOrder) {
    this.description = props.description
    this.workOrderResult = props.workOrderResult
    this.installation = props.installation
    this.active = props.active
    this.createdAt = props.createdAt
    this.createdBy = props.createdBy
    this.updatedAt = props.updatedAt
    this.updatedBy = props.updatedBy
    this.deletedAt = props.deletedAt
    this.deletedBy = props.deletedBy
  }
}
