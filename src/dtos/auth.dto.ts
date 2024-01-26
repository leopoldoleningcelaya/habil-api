import { IsEmail, IsString } from 'class-validator';

export class CredentialsDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class RefreshTokenDto {
  @IsString()
  public refresh_token: string;
}
