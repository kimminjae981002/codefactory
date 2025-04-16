import { Exclude, Expose } from 'class-transformer';

@Exclude() // 안 보이게
export class Movie {
  @Expose()
  id: number;

  title: string;
  genre: string;
}
