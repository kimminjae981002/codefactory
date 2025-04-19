import { IsNotEmpty } from 'class-validator';

export class UpdateDirectorDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  dob: Date;
  @IsNotEmpty()
  nationality: string;
}
