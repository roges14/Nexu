import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model as ModelClass } from 'src/schemas/model.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ModelsService {

  constructor(
    @InjectModel(ModelClass.name) private modelModel: Model<ModelClass>,
  ) {}

  async update(id: number, updateModelDto: UpdateModelDto) {
    try {
      // Update Model by id
      let updateRes = await this.modelModel.findOneAndUpdate({id: id}, {average_price: updateModelDto.average_price},{new: true}).exec();
      
      //Handling Error Model undefined
      if(!updateRes){
        throw new HttpException(`Model id: ${id} doesn´t exist"`, HttpStatus.BAD_REQUEST);
      }
      const { name, average_price } = updateRes;
      
      //Handlig Update response 
      return { message: 'Success Update Model', resultset: {name, average_price} };
    } catch(error){
      throw(error)
    }
  }
  
  async find(greater: number, lower: number) {
    let average_range_price = {} as any;

    // Generate range of averages
    if(!Number.isNaN(greater)){
      average_range_price.$gt = greater
    }
    if(!Number.isNaN(lower)){
      average_range_price.$lt = lower
    }
    try {
      // Get Model with average in a range
      let response = await this.modelModel.find({average_price: average_range_price}, '-brand_name -_id -__v').exec();
      return response;
    } catch(error){
      throw(error)
    }
  }

}
