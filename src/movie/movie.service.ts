import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private readonly movieDetailRepository: Repository<MovieDetail>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  // 여러 개의 무비 가져오기
  async getMovies() {
    const movies = await this.movieRepository.findAndCount({
      relations: ['director'],
    });
    return movies;
  }

  // 하나의 무비 가져오기
  async getMovie(id: number): Promise<Movie> {
    const movie: Movie | null = await this.movieRepository.findOne({
      where: { id },
      relations: ['movieDetail', 'director'],
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }

  // 무비 생성하기
  async createMovie(createMovieDto: CreateMovieDto) {
    const director = await this.directorRepository.findOne({
      where: { id: createMovieDto.directorId },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 감독입니다.');
    }

    const movieDetail = await this.movieDetailRepository.save({
      detail: createMovieDto.detail,
    });

    const movie = await this.movieRepository.save({
      title: createMovieDto.title,
      genre: createMovieDto.genre,
      movieDetail: movieDetail,
      director: { id: createMovieDto.directorId },
    });

    return movie;
  }

  // 무비 업데이트하기
  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const { detail, directorId, ...movieRest } = updateMovieDto;

    const director = await this.directorRepository.findOne({
      where: { id: directorId },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 감독입니다.');
    }

    const movie: Movie | null = await this.movieRepository.findOne({
      where: { id },
      relations: ['movieDetail', 'director'],
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    await this.movieRepository.update({ id }, { ...movieRest, director });

    // 만약 detail이 존재하면 movieDetail을 업데이트 한다.
    if (detail) {
      await this.movieDetailRepository.update(
        { id: movie.movieDetail.id },
        { detail },
      );
    }

    return movie;
  }

  async deleteMovie(id: number): Promise<void> {
    const movie: Movie | null = await this.movieRepository.findOne({
      where: { id },
      relations: ['movieDetail'],
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    await this.movieRepository.delete(id);

    await this.movieDetailRepository.delete(movie.movieDetail.id);
  }
}
