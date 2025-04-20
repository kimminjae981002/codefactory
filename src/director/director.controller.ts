import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('director')
@UseInterceptors(ClassSerializerInterceptor)
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Get()
  getMovies(): any {
    return this.directorService.getDirectors();
  }

  @Get(':id')
  getMovie(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory(error) {
          throw new BadRequestException('숫자를 입력해주세요.');
        },
      }),
    )
    id: number,
  ) {
    return this.directorService.getDirector(id);
  }

  @Post()
  createDirector(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.createDirector(createDirectorDto);
  }

  @Patch(':id')
  updateDirector(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory(error) {
          throw new BadRequestException('숫자를 입력해주세요.');
        },
      }),
    )
    id: number,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorService.updateDirector(id, updateDirectorDto);
  }

  @Delete(':id')
  deleteDirector(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory(error) {
          throw new BadRequestException('숫자를 입력해주세요.');
        },
      }),
    )
    id: number,
  ) {
    return this.directorService.deleteDirector(id);
  }
}
