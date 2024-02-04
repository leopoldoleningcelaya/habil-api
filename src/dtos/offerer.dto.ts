import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class OffererDto {
  @IsString()
  public id_user: string;

  @IsString()
  public profile_photo: string;

  @IsNumber()
  public id_city: number;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public profileDescription?: string;

  @IsOptional()
  @IsString()
  public phone?: string;

  @IsOptional()
  @IsString()
  public geoAddress?: string;

  @IsOptional()
  @IsString()
  public instagramAccount?: string;

  @IsOptional()
  @IsString()
  public facebookAccount?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  public serviceCategoriesIds: number[];
}
