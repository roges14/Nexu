import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Model, ModelSchema } from 'src/schemas/model.schema';
import { Brand, BrandSchema } from 'src/schemas/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Model.name, schema: ModelSchema }, 
      { name: Brand.name, schema: BrandSchema }
    ])
  ],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
