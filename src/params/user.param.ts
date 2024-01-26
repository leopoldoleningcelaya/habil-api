import { IsOptional } from 'class-validator';
import { UserRoles } from '@enums';
import { IsStringArrayOfEnum } from '@validators';
import { PaginationParams } from '.';

export class GetAllUsersParams extends PaginationParams {
  @IsStringArrayOfEnum(UserRoles)
  @IsOptional()
  public roles?: UserRoles[];
}
