import { IsString } from 'class-validator';

export class PhotoDto {
  @IsString()
  public image: string;
}
