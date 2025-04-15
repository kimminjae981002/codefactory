import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  genre: string;
}
