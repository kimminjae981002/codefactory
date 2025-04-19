import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entity/genre.entity';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}
  async createGenre(createGenreDto: CreateGenreDto) {
    return await this.genreRepository.save(createGenreDto);
  }

  async getGenres() {
    return await this.genreRepository.find();
  }

  async getGenre(id: number) {
    return await this.genreRepository.findOne({ where: { id } });
  }

  async updateGenre(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = await this.genreRepository.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundException('장르를 찾을 수 없습니다.');
    }

    await this.genreRepository.update(
      { id },
      { name: updateGenreDto.name, content: updateGenreDto.content },
    );
  }

  async deleteGenre(id: number) {
    const genre = await this.genreRepository.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundException('장르를 찾을 수 없습니다.');
    }

    await this.genreRepository.delete(id);
  }
}
