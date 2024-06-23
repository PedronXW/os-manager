import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import 'reflect-metadata'
import { User } from './user'

export class UserValidationRules {
  @IsString({ each: true, message: 'Name must be a string' })
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name: string

  @IsString({ each: true, message: 'Name must be a string' })
  @Length(8, 255, { message: 'Password must be between 3 and 255 characters' })
  password: string

  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string

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

  @IsDateString({ strict: true }, { message: 'deletedAt must be a valid date' })
  @IsOptional()
  deletedAt?: Date | null

  constructor(props: User) {
    this.name = props.name
    this.email = props.email
    this.active = props.active
    this.password = props.password
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.deletedAt = props.deletedAt
  }
}
