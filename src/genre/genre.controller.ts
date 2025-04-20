import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genre')
@UseInterceptors(ClassSerializerInterceptor)
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.createGenre(createGenreDto);
  }

  @Get()
  findAll() {
    return this.genreService.getGenres();
  }

  @Get(':id')
  findOne(
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
    return this.genreService.getGenre(+id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory(error) {
          throw new BadRequestException('숫자를 입력해주세요.');
        },
      }),
    )
    id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genreService.updateGenre(+id, updateGenreDto);
  }

  @Delete(':id')
  remove(
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
    return this.genreService.deleteGenre(+id);
  }
}
