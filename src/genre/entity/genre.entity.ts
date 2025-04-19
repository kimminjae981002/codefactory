import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;
}
