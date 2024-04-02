import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Model, ModelSchema } from 'src/schemas/model.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Model.name, schema: ModelSchema }])
  ],
  controllers: [ModelsController],
  providers: [ModelsService]
})
export class ModelsModule {}
