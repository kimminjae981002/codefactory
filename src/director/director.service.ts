import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entity/director.entity';
import { Repository } from 'typeorm';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  // 여러 개의 감독 가져오기
  async getDirectors() {
    return [
      await this.directorRepository.find(),
      await this.directorRepository.count(),
    ];
  }

  // 하나의 감독 가져오기
  async getDirector(id: number): Promise<Director> {
    const director: Director | null = await this.directorRepository.findOne({
      where: { id },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 감독입니다.');
    }

    return director;
  }

  // 무비 생성하기
  async createDirector(createDirectorDto: CreateDirectorDto) {
    const director = await this.directorRepository.save({
      name: createDirectorDto.name,
      dob: createDirectorDto.dob,
      nationality: createDirectorDto.nationality,
    });

    return director;
  }

  // 감독 업데이트하기
  async updateDirector(
    id: number,
    updateDirectorDto: UpdateDirectorDto,
  ): Promise<void> {
    const { name, dob, nationality } = updateDirectorDto;

    const director: Director | null = await this.directorRepository.findOne({
      where: { id },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 감독입니다.');
    }

    await this.directorRepository.update({ id }, { name, dob, nationality });
  }

  async deleteDirector(id: number): Promise<void> {
    const director: Director | null = await this.directorRepository.findOne({
      where: { id },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 감독입니다.');
    }

    await this.directorRepository.delete(id);
  }
}
