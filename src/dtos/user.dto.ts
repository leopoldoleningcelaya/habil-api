import { IsString, IsBoolean, IsArray, IsOptional, IsEnum } from 'class-validator';
import { CredentialsDto } from '@dtos/auth.dto';
import { UserRoles } from '@enums';

export class UserDto extends CredentialsDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

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

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public firstName?: string;

  @IsString()
  @IsOptional()
  public lastName?: string;

  @IsString()
  @IsOptional()
  public password?: string;
}
