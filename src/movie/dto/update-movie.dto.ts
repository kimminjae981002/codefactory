import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  genre?: string;
}
