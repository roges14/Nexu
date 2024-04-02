import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Brand } from './brand.schema';

export type ModelDocument = HydratedDocument<Model>;

@Schema()
export class Model {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    average_price: number;

    @Prop({ required: true })
    brand_name: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);