import { EntityId } from '@/@shared/entities/entity-id'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator'
import 'reflect-metadata'
import { WorkOrderAvaliation } from './work-order-avaliation'

export class WorkOrderAvaliationValidationRules {
  @Length(3, 255, {
    message: 'Description must be between 3 and 255 characters',
  })
  comment: string

  @IsNumber()
  @Max(10)
  @Min(1)
  rating: number

  @ValidateNested({ each: true })
  @Type(() => EntityId)
  @IsOptional()
  workOrderId?: EntityId | null

  @IsBoolean({ message: 'Active must be a boolean' })
  active: boolean

  @IsDateString(
    { strict: true },
    { message: 'Created at must be a valid date' },
  )
  createdAt: Date

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

  constructor(props: WorkOrderAvaliation) {
    this.comment = props.comment
    this.workOrderId = props.workOrderId
    this.rating = props.rating
    this.active = props.active
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.updatedBy = props.updatedBy
    this.deletedAt = props.deletedAt
    this.deletedBy = props.deletedBy
  }
}
