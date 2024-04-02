import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { MongooseModule} from '@nestjs/mongoose';
import { Brand, BrandSchema } from 'src/schemas/brand.schema';
import { Model, ModelSchema } from 'src/schemas/model.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }, { name: Model.name, schema: ModelSchema }])
  ],
  controllers: [BrandsController],
  providers: [BrandsService]
})
export class BrandsModule {}
