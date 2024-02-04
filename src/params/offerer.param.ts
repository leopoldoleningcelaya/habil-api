import { IsNumber, IsOptional } from 'class-validator';
import { PaginationParams } from '.';

export class GetAllOfferersParams extends PaginationParams {
  @IsNumber()
  @IsOptional()
  id_country?: number;

  @IsNumber()
  @IsOptional()
  id_city?: number;
}
