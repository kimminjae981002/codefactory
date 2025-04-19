import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from './entity/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  providers: [DirectorService],
  controllers: [DirectorController],
})
export class DirectorModule {}
