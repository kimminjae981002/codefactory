import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { IsPasswordValid } from '../validator/passwordValidator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsNumber()
  directorId: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  genreIds: number[];
}
