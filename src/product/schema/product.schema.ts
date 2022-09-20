import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from '../entities/product.entity';

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
