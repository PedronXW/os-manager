import { EntityId } from '@/@shared/entities/entity-id'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator'
import 'reflect-metadata'
import { Client } from './client'

export class ClientValidationRules {
  @IsString({ each: true, message: 'Name must be a string' })
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name: string

  @IsString({ each: true, message: 'Contacts must be a string' })
  @Length(3, 255, {
    each: true,
    message: 'Contacts must be between 3 and 255 characters',
  })
  contacts: string[]

  @IsString({ each: true, message: 'ManagerName must be a string' })
  @Length(3, 255, {
    message: 'Manager name must be between 3 and 255 characters',
  })
  managerName: string

  @Length(3, 255, { message: 'Document must be between 3 and 255 characters' })
  document: string

  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string

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

  constructor(props: Client) {
    this.name = props.name
    this.contacts = props.contacts
    this.managerName = props.managerName
    this.document = props.document
    this.email = props.email
    this.active = props.active
    this.createdAt = props.createdAt
    this.createdBy = props.createdBy
    this.updatedAt = props.updatedAt
    this.updatedBy = props.updatedBy
    this.deletedAt = props.deletedAt
    this.deletedBy = props.deletedBy
  }
}
