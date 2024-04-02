import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateModelDto } from 'src/models/dto/create-model.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  getAll() {
    return this.brandsService.getAll();
  }

  @Get(':id/models')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }
 
  @Post('')
  insertOne(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.insertOne(createBrandDto);
  }
  
  @Post(':id/models')
  insertModel(
    @Param('id') id: string,
    @Body() createModelDto: CreateModelDto
  ) {
    return this.brandsService.insertModelByBrandId(+id, createModelDto);
  }

}
