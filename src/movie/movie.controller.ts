import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies(@Query('title') title: string) {
    return this.movieService.getMovies(title);
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
    return this.movieService.getMovie(id);
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  @Patch(':id')
  updateMovie(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory(error) {
          throw new BadRequestException('숫자를 입력해주세요.');
        },
      }),
    )
    id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  deleteMovie(
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
    return this.movieService.deleteMovie(id);
  }
}
