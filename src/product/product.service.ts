import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private productModel: Model<ProductDocument>,
  ) {}

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const found = await this.productModel.findOne({ id });

    if (!found) {
      throw new NotFoundException(`product with id= ${id} not found`);
    }
    return found;
  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const {
      _id,
      productAuthor,
      productSKU,
      productDescription,
      productCurrency,
      productImageRatio,
      productTags,
      productFormat,
      isPublished,
      isFeatured,
      isAdded,
      productQuantity,
      productTitle,
      productImageUrl,
      productLanguage,
      categoryId,
      productPrice,
    } = createProductInput;
    console.log(productImageUrl, productLanguage);

    const createdproduct = new this.productModel({
      id: randomUUID(),
      _id,
      productAuthor,
      productSKU,
      productDescription,
      productCurrency,
      productImageRatio,
      productTags,
      productFormat,
      isPublished,
      isFeatured,
      isAdded,
      productQuantity,
      productTitle,
      productImageUrl,
      productLanguage,
      categoryId,
      productPrice,
      productPublishedDate: new Date(),
      productUpdateDate: new Date(),
    });
    return (await createdproduct.save()) as any;
  }

  async update(
    id: string,
    CreateProjectInput: CreateProductInput,
  ): Promise<Product> {
    // const found = await this.findOne(id);

    const category = await this.productModel
      .findOneAndUpdate({ id }, CreateProjectInput)
      .exec();
    return await category;
  }

  async deleteProduct(id: string) {
    const found = await this.findOne(id);
    const deletemethod = await this.productModel.findOneAndDelete(found.id);
    return deletemethod;
  }
  getHello(): string {
    return 'Hello World!';
  }
  // async getProductsWithFilters(filterDto: GetBooksFilterDto): Promise<Book[]> {
  //   const { bookFormat } = filterDto;

  // }
}
