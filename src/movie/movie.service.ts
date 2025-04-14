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

  // 하나의 무비 가져오기
  getMovie(id: number): number {
    const movie: number = this.movies.findIndex((m) => {
      m.id === +id;
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }

  // 무비 생성하기
  createMovie(title: string) {
    const newMovie = this.movies.push({ id: this.idCounter++, title });

    return newMovie;
  }
}
