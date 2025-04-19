import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { MovieDetail } from './movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entity/genre.entity';

// ManyToOne Director -> 감독은 여러 개 영화 생성
// OneToOne MovieDetail -> 하나의 영화는 하나의 상세설명을 가짐
// ManyToMany Genre - > 여러 개의 영화는 여러 개의 장르를 가질 수 있고, 여러 개 장르 또한 여러 개의 영화를 가질 수 있다.

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToOne(() => MovieDetail, (movieDetail) => movieDetail.id, {
    nullable: false,
  })
  @JoinColumn() // movie가 movieDetail을 갖고 있는다.
  movieDetail: MovieDetail;

  @ManyToOne(() => Director, (director) => director.id, {
    nullable: false,
  })
  director: Director;

  @ManyToMany(() => Genre, (genre) => genre.movies, { nullable: false })
  @JoinTable() // Movie & Genre 중간 테이블을 생성하기 위해 명시
  genres: Genre[];
}
