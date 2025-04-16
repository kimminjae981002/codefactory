import { Exclude, Expose, Transform } from 'class-transformer';

export class Movie {
  id: number;
  title: string;

  @Transform(({ value }) => value.toString().toUpperCase()) // genre 값 모두 대문자
  genre: string;
}
