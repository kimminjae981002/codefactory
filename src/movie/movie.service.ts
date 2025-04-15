import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
  genre: string;
}
@Injectable()
export class MovieService {
  private movies: Movie[] = [
    { id: 1, title: '해리포터', genre: 'fantasy' },
    { id: 2, title: '반지의 제왕', genre: 'romance' },
  ];

  private idCounter = 3;

  // 여러 개의 무비 가져오기
  getMovies(): Movie[] {
    return this.movies;
  }

  // 하나의 무비 가져오기
  getMovie(id: number): Movie[] {
    const movie: Movie[] = this.movies.filter((m) => {
      return m.id === +id;
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }

  // 무비 생성하기
  createMovie(createMovieDto: CreateMovieDto): number {
    const newMovie: number = this.movies.push({
      id: this.idCounter++,
      title: createMovieDto.title,
      genre: createMovieDto.genre,
    });

    return newMovie;
  }

  // 무비 업데이트하기
  updateMovie(id: number, updateMovieDto: UpdateMovieDto): Movie[] {
    const movie = this.movies.find((v) => v.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    movie.title = updateMovieDto.title ?? movie.title;
    movie.genre = updateMovieDto.genre ?? movie.genre;

    return this.movies;
  }

  deleteMovie(id: number) {
    const movie: number = this.movies.findIndex((v) => {
      return v.id === +id;
    });

    if (movie === -1) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    this.movies.splice(movie, 1);

    return this.movies;
  }
}
