import { IsEmail, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  public refresh_token: string;
}

export class CredentialsDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
