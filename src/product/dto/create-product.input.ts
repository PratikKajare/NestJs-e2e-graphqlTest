import { InputType, Field, ID } from '@nestjs/graphql';
import { IsIn, MinLength } from 'class-validator';
import { productFormat } from '../enum/filter.enum';

@InputType()
export class CreateProductInput {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field(() => ID, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  id: string;
  @Field({ nullable: true, description: 'product Author' })
  productAuthor: string;
  @Field({ nullable: true, description: 'product productSKU' })
  productSKU: string;
  // @MinLength(4)
  @Field({ nullable: true, description: 'productDescription' })
  productDescription: string;
  @Field({ nullable: true, description: 'productCurrency' })
  productCurrency: string;
  @Field({ nullable: true, description: 'productImageRatio' })
  productImageRatio: string;
  @Field((type) => [String], { nullable: true, description: 'productTags' })
  productTags: [string];
  // @IsIn([productFormat.HB, productFormat.SB])
  @Field({ nullable: true, description: 'productFormat' })
  productFormat: productFormat;
  @Field({ nullable: true, description: 'isPublished' })
  isPublished: boolean;
  @Field({ nullable: true, description: 'isFeatured' })
  isFeatured: boolean;
  @Field({ nullable: true, description: 'isAdded' })
  isAdded: boolean;
  @Field({ nullable: true, description: ' productQuantity' })
  productQuantity: number;
  @Field({ nullable: true, description: 'productTitle' })
  productTitle: string;
  @Field({ nullable: true, description: 'productImageUrl' })
  productImageUrl: string;
  @Field({ nullable: true, description: 'productLanguage' })
  productLanguage: string;
  @Field({ nullable: true, description: 'categoryId' })
  categoryId: number;
  @Field({ nullable: true, description: 'productPrice' })
  productPrice: number;
  @Field({ nullable: true, description: 'productPublishedDate' })
  productPublishedDate: Date;
  @Field({ nullable: true, description: 'productPublishedDate' })
  productUpdateDate: Date;
}
