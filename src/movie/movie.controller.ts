import { MovieService } from './movie.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
}
