import { IsNotEmpty, IsOptional } from 'class-validator';

enum movieGenre {
  action = 'action',
  fantasy = 'fantasy',
}

export class UpdateMovieDto {
  // 없으면 안된다.
  @IsNotEmpty()
  title?: string;

  // 있어도 되고 없어도 된다.
  @IsOptional()
  genre?: string;

  @IsOptional()
  detail?: string;
}
