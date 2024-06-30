import { EntityId } from '@/@shared/entities/entity-id'
import { Type } from 'class-transformer'
import {
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
    Length,
    ValidateNested,
} from 'class-validator'
import 'reflect-metadata'
import { Role } from './role'

export class RoleValidationRules {
  @IsString({ each: true, message: 'Name must be a string' })
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name: string

  @Length(3, 255, {
    message: 'Description must be between 3 and 255 characters',
  })
  description: string

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

  constructor(props: Role) {
    this.name = props.name
    this.description = props.description
    this.active = props.active
    this.createdAt = props.createdAt
    this.createdBy = props.createdBy
    this.updatedAt = props.updatedAt
    this.updatedBy = props.updatedBy
    this.deletedAt = props.deletedAt
    this.deletedBy = props.deletedBy
  }
}
