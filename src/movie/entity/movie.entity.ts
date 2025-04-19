import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { MovieDetail } from './movie-detail.entity';

// ManyToOne Director -> 감독은 여러 개 영화 생성
// OneToOne MovieDetail -> 하나의 영화는 하나의 상세설명을 가짐
// ManyToMany Genre - > 여러 개의 영화는 여러 개의 장르를 가질 수 있고, 여러 개 장르 또한 여러 개의 영화를 가질 수 있다.

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @OneToOne(() => MovieDetail, (movieDetail) => movieDetail.id)
  @JoinColumn() // movie가 movieDetail을 갖고 있는다.
  movieDetail: MovieDetail;
}
