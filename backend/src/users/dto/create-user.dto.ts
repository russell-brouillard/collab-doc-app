// backend/src/users/dto/create-user.dto.ts

import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, {
    message:
      'password too weak. It should contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;
}
