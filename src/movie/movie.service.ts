import { Injectable } from '@nestjs/common';

interface Movie {
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
  getMovie(id: number) {
    return this.movies.find((m) => {
      m.id === id;
    });
  }
}
