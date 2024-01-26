import { IsOptional } from 'class-validator';
import { IsIntegerString } from '@validators/index';

export class PaginationParams {
  @IsIntegerString({ message: 'pageNumber must be an integer' })
  @IsOptional()
  public pageNumber?: number;

  @IsIntegerString({ message: 'pageSize must be an integer' })
  @IsOptional()
  public pageSize?: number;
}
