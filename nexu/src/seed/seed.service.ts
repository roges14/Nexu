import { HttpStatus, Injectable } from '@nestjs/common';
import { ModelsSeed } from './models';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Model as ModelClass } from 'src/schemas/model.schema';
import { Brand } from 'src/schemas/brand.schema';
import { HttpResponse } from 'src/schemas/genericResponse';


@Injectable()
export class SeedService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(ModelClass.name) private modelModel: Model<ModelClass>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>
  ) {}

  async create() {    
    await this.connection.db.dropDatabase();

    let modelsArray = [];
    let brandsArray = [];
    
    // Get array of model objects from file 
    let brands = ModelsSeed.map(el => el.brand_name);
    brands = [...new Set(brands)].sort();

    // Generate array of inserts of Brands
    brands.forEach((brand, index) => {
      brandsArray.push({
        insertOne: {
          document: {
            id: index+1, 
            name: brand
          }
        }
      })
    });

    // Generate array of inserts of Models
    ModelsSeed.forEach(model => {
      modelsArray.push({
        insertOne: {
          document: {
            ...model
          }
        }
      })
    });
    
    //Await all async Inserts
    let [brandResponse, modelResponse] = await Promise.all([this.bulkBrand(brandsArray), this.bulkModel(modelsArray)]);

    // Generate response object
    const response: HttpResponse = {
      code: HttpStatus.OK,
      resultset: {
        models:{
          ...modelResponse as any
        },
        brands:{
          ...brandResponse as any
        }
      },
      message: "Seed loaded correctly"
    };
    return response;
  }

  /**
   * Bulk Insert  of list of Brands
   *
   * @param   brandsArray  Array of inserts
   * @returns Promise
  */
  async bulkBrand(brandsArray){
    return new Promise((resolve, reject) => {
      this.brandModel.bulkWrite(brandsArray).then(res => {
        resolve({insertedCount: res.insertedCount})
      });
    });
  }
  
  /**
   * Bulk Insert of list of Models
   *
   * @param   modelsArray  Array of inserts
   * @returns Promise
  */
  async bulkModel(modelsArray){
    return new Promise((resolve, reject) => {
      this.modelModel.bulkWrite(modelsArray).then(res => {
        resolve({insertedCount: res.insertedCount})
      });
    });
  }
}
