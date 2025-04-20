import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MovieTitleValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!value) {
      return value;
    }
    // Title이 길이가 2보다 작으면 에러
    if (value.length <= 2) {
      throw new BadRequestException('영화의 제목은 3글자 이상 작성해주세요.');
    }

    return value;
  }
}
