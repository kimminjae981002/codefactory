import { IsNotEmpty, Validate } from 'class-validator';
import { IsPasswordValid } from '../validator/passwordValidator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  detail: string;

  @IsNotEmpty()
  directorId: number;
}
