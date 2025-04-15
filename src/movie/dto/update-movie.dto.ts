import {
  Equals,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsDefined,
  IsEmpty,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
  NotEquals,
} from 'class-validator';

enum movieGenre {
  action = 'action',
  fantasy = 'fantasy',
}

export class UpdateMovieDto {
  // basic

  // 없으면 안된다.
  @IsNotEmpty()
  title?: string;

  // 있어도 되고 없어도 된다.
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

  // type

  // 숫자만
  @IsNumber()
  test7: number;

  // 문자만
  @IsString()
  test8: string;

  // 불리언만
  @IsBoolean()
  test9: boolean;

  // 정수만
  @IsInt()
  test10: number;

  // 배열만
  @IsArray()
  test11: string[];

  // Enum 타입만
  @IsEnum(movieGenre)
  test12: string;

  // 실제 날짜 객체
  @IsDate()
  test13: Date;

  // 날짜 스트링
  @IsDateString()
  test14: string;
}
