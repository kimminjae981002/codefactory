import {
  Contains,
  Equals,
  IsAlphanumeric,
  IsArray,
  IsBoolean,
  IsCreditCard,
  IsDate,
  IsDateString,
  IsDefined,
  IsDivisibleBy,
  IsEmpty,
  IsEnum,
  IsHexColor,
  IsIn,
  IsInt,
  IsNegative,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotContains,
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

  // Number type

  // 5로 나뉘어지는 것만
  @IsDivisibleBy(5)
  test15: number;

  // 양수만
  @IsPositive()
  test16: number;

  // 음수만
  @IsNegative()
  test17: number;

  // 100 보다 작은 것만
  @Min(100)
  test18: number;

  // 100 보다 큰 것만
  @Max(100)
  test19: number;

  // String type

  // 어디에 문자가 포함되어 있어야 한다.
  @Contains('code')
  test20: string;

  // 어디에 문자가 포함되어 있으면 안된다.
  @NotContains('code')
  test21: string;

  // 알파벳과 숫자로 이루어져있나
  @IsAlphanumeric()
  test22: string;

  // 카드 형식을 맞추고 있나 0123-1523-1235-2314
  @IsCreditCard()
  test23: string;

  // 16진수로 색깔을 컬러 #123456
  @IsHexColor()
  test24: string;

  // 15글자가 최대이다.
  @MaxLength(15)
  test25: string;

  // 15글자 보다 커야한다.
  @MinLength(15)
  test26: string;

  //
}
