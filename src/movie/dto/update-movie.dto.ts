import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum movieGenre {
  action = 'action',
  fantasy = 'fantasy',
}

export class UpdateMovieDto {
  // 없으면 안된다.
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  detail?: string;

  @IsNotEmpty()
  @IsNumber()
  directorId: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  genreIds: number[];
}
