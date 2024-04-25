import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { RoleType, RoleTypeStrings } from './enum/role-type.enum'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsEnum(RoleType, {
    message: 'Valid role required',
  })
  role: RoleTypeStrings
}
