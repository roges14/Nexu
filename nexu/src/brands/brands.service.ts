import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/schemas/brand.schema';
import { Model as ModelClass } from 'src/schemas/model.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateModelDto } from 'src/models/dto/create-model.dto';

@Injectable()
export class BrandsService {

  constructor(
    @InjectModel(ModelClass.name) private modelModel: Model<ModelClass>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>
  ) {}
  
  async getAll() {

    //Get all brands from DB
    let allBrands: [{id:number, name: string}]| any = await this.brandModel.find({}, 'name id -_id').exec();
    
    //Get all brands from DB
    let allModels: ModelClass[] = await this.modelModel.find({}, '-_id').exec();

    let response: [{id:number, nombre: string, average_price:number}] = [] as any;
    allBrands.forEach(brand => {
      // Get Sum of average_price by Brand
      let average_price = allModels.filter(model => model.brand_name === brand.name).reduce((n, {average_price}) => n + average_price, 0);
      response.push({id : brand.id, nombre: brand.name, average_price: average_price})
    });

    return response;
  }

  async findOne(brandId: number) {
    //Get brands by brandId
    let brand: [{id:number, name: string}]| any = await this.brandModel.findOne({id: brandId}, 'name id -_id').exec();
    
    //Get all models by BrandId
    let response: ModelClass[] = await this.modelModel.find({brand_name: brand.name}, '-brand_name -_id -__v').exec();
    return response;
  }
  
  async insertOne(createBrandDto: CreateBrandDto) {
    //Get last Index
    let lastId = await this.brandModel.findOne({}, 'id -_id', {sort:{id:-1}}).exec();
    
    // Insert new Brand
    try {
      let insertRes = await this.brandModel.create({id: lastId.id+1, name: createBrandDto.name});
      const { id, name } = insertRes;
      
      //Handlig Insert response 
      return { message: 'Success Insert Brand', resultset: {id, name} };

    } catch(error){
      //Handling duplicated Error
      if (error.code == 11000){
        throw new HttpException(`E11000 duplicate key error keyValue:"${JSON.stringify(error.keyValue)}"`, HttpStatus.BAD_REQUEST);
      } else {
        throw(error)
      }
    }
    
  }
  
  async insertModelByBrandId(brandId:number , createModelDto: CreateModelDto) {
    //Get last Index
    let lastId = await this.modelModel.findOne({}, 'id -_id', {sort:{id:-1}}).exec();
    
    // Get brand Info from DB
    let brand = await this.brandModel.findOne({id: brandId}, 'id name -_id').exec();
    // Validation: brand doesn´t exist
    if(!brand){
      throw new HttpException(`Brand id:${brandId} doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    
    //Get Models of a Brand
    let brandModel = await this.modelModel.find({brand_name: brand.name, name: createModelDto.name}, 'id name -_id').exec();
    // Validation: Model exist in a Brand
    if(brandModel?.length){
      throw new HttpException(`Model name:${createModelDto.name} already exists for that brand Brand`, HttpStatus.BAD_REQUEST);
    }
    
    // Insert new Model
    try {
      let insertRes = await this.modelModel.create(
        {
          id: lastId.id+1, 
          name: createModelDto.name, 
          average_price: createModelDto.average_price ? createModelDto.average_price : 0, 
          brand_name: brand.name
        }
      );
      const { id, name, average_price, brand_name } = insertRes;
      
      //Handlig Insert response 
      return { message: 'Success Insert Model', resultset: {id, name, average_price, brand_name} };
    } catch(error){
      //Handling duplicated Error
      if (error.code == 11000){
        throw new HttpException(`E11000 duplicate key error keyValue:"${JSON.stringify(error.keyValue)}"`, HttpStatus.BAD_REQUEST);
      } else {
        throw(error)
      }
    }
  }
}
