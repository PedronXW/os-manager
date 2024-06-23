import { EntityId } from '@/@shared/entities/entity-id'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  Length,
  ValidateNested,
} from 'class-validator'
import 'reflect-metadata'
import { WorkOrderResult } from './work-order-result'

export class WorkOrderResultValidationRules {
  @ValidateNested({ each: true })
  @Type(() => EntityId)
  @IsOptional()
  workOrderId?: EntityId | null

  @Length(3, 255, {
    message: 'Description must be between 3 and 255 characters',
  })
  description: string

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number

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

  constructor(props: WorkOrderResult) {
    this.description = props.description
    this.price = props.price
    this.active = props.active
    this.createdAt = props.createdAt
    this.createdBy = props.createdBy
    this.updatedAt = props.updatedAt
    this.updatedBy = props.updatedBy
    this.deletedAt = props.deletedAt
    this.deletedBy = props.deletedBy
  }
}
