import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  @Query(() => String)
  async hello() {
    return 'helloo';
  }
  @Query(() => String)
  getHello(): string {
    return this.productService.getHello();
  }
  @Query(() => [Product], { name: 'Book' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Query(() => Product, { name: 'BookById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productService.findOne(id);
  }

  @Mutation((returns) => Product)
  async createProduct(
    @Args('createAssignmentInput')
    createBookInput: CreateProductInput,
  ): Promise<Product> {
    return await this.productService.create(createBookInput);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  async updateAssignment(
    @Args('id') id: string,
    @Args('updateProductInput') updateProductInput: CreateProductInput,
  ) {
    return await this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  async deleteBook(@Args('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
