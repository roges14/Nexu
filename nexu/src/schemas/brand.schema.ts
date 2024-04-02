import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop({ 
    required: true,
    unique: true
  })
  id: number;

  @Prop({ 
    required: true,
    unique: true
  })
  name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);