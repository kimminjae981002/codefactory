import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  // 여러 개의 무비 가져오기
  async getMovies(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  // 하나의 무비 가져오기
  async getMovie(id: number): Promise<Movie> {
    const movie: Movie | null = await this.movieRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }

  // 무비 생성하기
  async createMovie(createMovieDto: CreateMovieDto): Promise<void> {
    await this.movieRepository.save({
      title: createMovieDto.title,
      genre: createMovieDto.genre,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // 무비 업데이트하기
  async updateMovie(id: number, updateMovieDto: UpdateMovieDto): Promise<void> {
    const movie: Movie | null = await this.movieRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    await this.movieRepository.update(
      { id },
      { title: updateMovieDto.title, genre: updateMovieDto.genre },
    );
  }

  async deleteMovie(id: number): Promise<void> {
    const movie: Movie | null = await this.movieRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    await this.movieRepository.delete(id);
  }
}
