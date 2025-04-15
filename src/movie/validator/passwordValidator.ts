import { ValidationOptions } from './../../../node_modules/class-validator/types/decorator/ValidationOptions.d';

import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// 비동기도 가능
// @ValidatorConstraint({
//     async:true
// })

@ValidatorConstraint()
export class PassValidator implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    /// 비밀번호 길이는 4-8
    return value.length > 4 && value.length < 8;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return '비밀번호의 길이는 4글자 ~ 8글자입니다. 입력된 비밀번호: ($value)';
  }
}

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PassValidator,
    });
  };
}
