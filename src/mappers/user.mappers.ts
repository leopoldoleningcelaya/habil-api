import { ParsedQs } from 'qs';
import { UserRoles } from '@enums';
import { GetAllUsersParams } from '@params/user.param';
import { mapQueryToPaginationParams } from '.';

export function mapQueryToGetAllUsersParams(query: ParsedQs): GetAllUsersParams {
  const response = new GetAllUsersParams();
  const { pageNumber, pageSize } = mapQueryToPaginationParams(query);
  response.pageNumber = pageNumber;
  response.pageSize = pageSize;
  response.roles = (query.roles as string)?.replace(/ /, '').split(',') as UserRoles[];
  return response;
}
