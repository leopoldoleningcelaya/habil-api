import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';
import { UserRoles } from '@enums/index';
import { CredentialsDto } from './auth.dto';

export class UserDto extends CredentialsDto {
  @IsArray()
  @IsEnum(UserRoles, { each: true })
  public roles: UserRoles[];

  @IsString()
  public username: string;
}

export class UserEnabledDto {
  @IsBoolean()
  public enabled: boolean;
}

export class ChangeUserPasswordDto {
  @IsString()
  public password: string;
}
