import { IsOptional } from 'class-validator';

export class UpdateGenreDto {
  @IsOptional()
  name: string;

  @IsOptional()
  content: string;
}
