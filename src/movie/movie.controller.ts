import { MovieService } from './movie.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies() {
    return this.movieService.getMovies();
  }

  @Get(':id')
  getMovie(@Param('id') id: number) {
    return this.movieService.getMovie(id);
  }

  @Post()
  createMovie(@Body('title') title: string) {
    return this.movieService.createMovie(title);
  }

  @Patch(':id')
  updateMovie(@Param('id') id: number, @Body('title') title: string) {
    return this.movieService.updateMovie(id, title);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number) {
    return this.movieService.deleteMovie(id);
  }
}
