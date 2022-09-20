import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { productFormat } from '../enum/filter.enum';

@Schema()
@ObjectType()
export class Product {
  @Prop({ nullable: true })
  @Field({ nullable: true })
  _id: string;
  @Prop()
  @Field(() => ID, { nullable: true })
  id: string;
  @Prop()
  @Field({ nullable: true })
  productAuthor: string;
  @Prop()
  @Field({ nullable: true })
  productSKU: string;
  @Prop()
  @Field({ description: 'productDescription' })
  productDescription: string;
  @Prop()
  @Field({ description: 'productCurrency' })
  productCurrency: string;
  @Prop()
  @Field({ description: 'productImageRatio' })
  productImageRatio: string;
  @Prop()
  @Field((type) => [String], { description: 'productTags' })
  productTags: [string];
  @Prop()
  @Field({ description: 'productFormat' })
  productFormat: productFormat;
  @Prop()
  @Field({ description: 'isPublished' })
  isPublished: boolean;
  @Prop()
  @Field({ description: 'isFeatured' })
  isFeatured: boolean;
  @Prop()
  @Field({ description: 'isAdded' })
  isAdded: boolean;
  @Prop()
  @Field({ description: ' productQuantity' })
  productQuantity: number;
  @Prop()
  @Field({ description: 'productTitle' })
  productTitle: string;
  @Prop()
  @Field({ description: 'productImageUrl' })
  productImageUrl: string;
  @Prop()
  @Field({ description: 'productLanguage' })
  productLanguage: string;
  @Prop()
  @Field({ nullable: true, description: 'categoryId' })
  categoryId: number;
  @Prop()
  @Field({ description: 'productPrice' })
  productPrice: number;
  @Prop()
  @Field({ description: 'productPublishedDate', nullable: true })
  productPublishedDate: Date;
  @Prop()
  @Field({ description: 'productPublishedDate', nullable: true })
  productUpdateDate: Date;
}
