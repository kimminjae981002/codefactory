import {
  Equals,
  IsDefined,
  IsEmpty,
  IsIn,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  NotEquals,
} from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  genre?: string;

  // null || undefined 이면 에러를 던진다.
  @IsDefined()
  test1: string;

  // hello와 같지 않으면 에러를 던진다.
  @Equals('hello')
  test2: string;

  // world와 같으면 에러를 던진다.
  @NotEquals('world')
  test3: string;

  // null || undefined || '' 가 안 나오면 에러를 던진다.
  @IsEmpty()
  test4: string;

  // 배열 안에 있는 값 중 하나이어야한다.
  @IsIn(['test5', 'test'])
  test5: string;

  // 배열 안에 있는 값이 아니어야한다..
  @IsNotIn(['test15', 'test16'])
  test6: string;
}
