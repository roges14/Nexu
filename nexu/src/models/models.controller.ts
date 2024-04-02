import { Controller, Get, Body,Param, Put, Query } from '@nestjs/common';
import { ModelsService } from './models.service';
import { UpdateModelDto } from './dto/update-model.dto';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Put(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelsService.update(+id, updateModelDto);
  }

  @Get()
  find(
    @Query('greater') greater: string,
    @Query('lower') lower: string
  ) {
    return this.modelsService.find(+greater, +lower);
  }
}
