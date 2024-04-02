import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelsModule } from './models/models.module';
import { BrandsModule } from './brands/brands.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ModelsModule, 
    BrandsModule,
    SeedModule,
    MongooseModule.forRoot(process.env.DATA_BASE_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
