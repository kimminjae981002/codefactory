import { IsNotEmpty, Validate } from 'class-validator';
import { IsPasswordValid } from '../validator/passwordValidator';

export class CreateMovieDto {
  id: number;

  @IsPasswordValid()
  password: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  genre: string;
}
