import { BaseEntity } from 'src/common/entity/base.entity';
import { Movie } from 'src/movie/entity/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @ManyToMany(() => Movie, (movie) => movie.genres, { nullable: false })
  movies: Movie[];
}
