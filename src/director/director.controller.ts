import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Get()
  getMovies(): any {
    return this.directorService.getDirectors();
  }

  @Get(':id')
  getMovie(@Param('id') id: number) {
    return this.directorService.getDirector(id);
  }

  @Post()
  createDirector(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.createDirector(createDirectorDto);
  }

  @Patch(':id')
  updateDirector(
    @Param('id') id: number,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorService.updateDirector(id, updateDirectorDto);
  }

  @Delete(':id')
  deleteDirector(@Param('id') id: number) {
    return this.directorService.deleteDirector(id);
  }
}
