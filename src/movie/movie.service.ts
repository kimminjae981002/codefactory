import { Injectable, NotFoundException } from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
}
@Injectable()
export class MovieService {
  private movies: Movie[] = [
    { id: 1, title: '해리포터' },
    { id: 2, title: '반지의 제왕' },
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
  createMovie(title: string): number {
    const newMovie: number = this.movies.push({ id: this.idCounter++, title });

    return newMovie;
  }

  // 무비 업데이트하기
  updateMovie(id: number, title: string): Movie[] {
    const movie = this.movies.find((v) => v.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    movie.title = title; // 직접 수정

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
