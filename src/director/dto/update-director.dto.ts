import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDirectorDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  dob: Date;
  @IsNotEmpty()
  @IsString()
  nationality: string;
}
