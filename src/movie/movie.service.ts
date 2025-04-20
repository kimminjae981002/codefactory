import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entity/genre.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private readonly movieDetailRepository: Repository<MovieDetail>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    private readonly dataSource: DataSource,
  ) {}

  // 여러 개의 무비 가져오기
  async getMovies(title?: string) {
    const qb = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.director', 'director')
      .leftJoinAndSelect('movie.genres', 'genres');

    if (title) {
      qb.where('movie.title LIKE :title', { title: `%${title}%` });
    }

    return await qb.getManyAndCount();
  }

  // 하나의 무비 가져오기
  async getMovie(id: number): Promise<Movie> {
    const movie = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.director', 'director')
      .leftJoinAndSelect('movie.genres', 'genres')
      .where('movie.id = :id', { id })
      .getOne();

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }

  // 무비 생성하기
  async createMovie(createMovieDto: CreateMovieDto) {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction(); // startTransaction() 격리 수준 설정 가능

    try {
      const director = await qr.manager.findOne(Director, {
        where: { id: createMovieDto.directorId },
      });

      if (!director) {
        throw new NotFoundException('존재하지 않는 감독입니다.');
      }

      // genreIds 여러 개를 찾아온다.
      const genres = await qr.manager.find(Genre, {
        where: { id: In(createMovieDto.genreIds) },
      });

      if (genres.length !== createMovieDto.genreIds.length) {
        throw new NotFoundException(
          `존재하지 않는 장르가 있습니다. 존재하는 ids -> ${genres.map((genre) => genre.id)}`,
        );
      }

      const movieDetail = await qr.manager.save(MovieDetail, {
        detail: createMovieDto.detail,
      });

      const movie = await qr.manager.save(Movie, {
        title: createMovieDto.title,
        movieDetail: movieDetail,
        director: { id: createMovieDto.directorId },
        genres,
      });

      await qr.commitTransaction(); // 트랜잭션 Commit 데이터베이스에 반영

      return movie;
    } catch (error) {
      await qr.rollbackTransaction(); // 에러 사항 생기면 전체 복구

      throw error;
    } finally {
      await qr.release(); // 꼭 실행
    }
  }

  // 무비 업데이트하기
  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction(); // startTransaction() 격리 수준 설정 가능
    try {
      const { detail, directorId, genreIds, title } = updateMovieDto;

      const director = await qr.manager.findOne(Director, {
        where: { id: directorId },
      });

      if (!director) {
        throw new NotFoundException('존재하지 않는 감독입니다.');
      }

      if (!genreIds) {
        throw new NotFoundException('장르 ID를 찾을 수 없습니다.');
      }

      // 업데이트 할 장르들을 저장한다.
      let newGenres;

      // genreIds 여러 개를 찾아온다.
      const genres = await qr.manager.find(Genre, {
        where: { id: In(genreIds) },
      });

      if (genres.length !== genreIds.length) {
        throw new NotFoundException(
          `존재하지 않는 장르가 있습니다. 존재하는 ids -> ${genres.map((genre) => genre.id)}`,
        );
      }

      newGenres = genres;

      const movie: Movie | null = await qr.manager.findOne(Movie, {
        where: { id },
        relations: ['movieDetail', 'director', 'genres'],
      });

      if (!movie) {
        throw new NotFoundException('존재하지 않는 영화입니다.');
      }

      await qr.manager.update(Movie, { id }, { title, director });

      // 만약 detail이 존재하면 movieDetail을 업데이트 한다.
      if (detail) {
        await qr.manager.update(
          MovieDetail,
          { id: movie.movieDetail.id },
          { detail },
        );
      }

      const newMovie: Movie | null = await qr.manager.findOne(Movie, {
        where: { id },
        relations: ['movieDetail', 'director', 'genres'],
      });

      if (!newMovie) {
        throw new NotFoundException('존재하지 않는 영화입니다.');
      }

      // 업데이트 된 장르들을 다시 저장해준다. (업데이트 기능에 적용이 안 된다.)
      newMovie.genres = newGenres;

      await qr.manager.save(Movie, newMovie);

      await qr.commitTransaction();

      return movie;
    } catch (error) {
      await qr.rollbackTransaction();

      throw error;
    } finally {
      await qr.release();
    }
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
