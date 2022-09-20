import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { BooksModule } from './product.module';
import {
  getConnectionToken,
  getModelToken,
  MongooseModule,
} from '@nestjs/mongoose';
import configuration from '../config/configuration';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigurationModule } from '../config/config.module';
import { ProductService } from './product.service';
import { Connection } from 'mongoose';
import { Product } from './entities/product.entity';
import * as pactum from 'pactum';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let mongoConnection: Connection;
  let url: string;
  // let request: () => supertest.Test;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BooksModule,
        ConfigModule.forRoot({
          envFilePath: `${process.cwd()}/.env`,
          isGlobal: true,
          load: [configuration],
        }),
        MongooseModule.forRoot(configuration().database.mongoDb),
        GraphQLModule.forRoot({
          driver: ApolloDriver,
          autoSchemaFile: 'schema.gql',
        }),
        ConfigurationModule,
      ],
      providers: [
        ProductService,
        {
          provide: getConnectionToken('DatabaseConnection'),
          useValue: mongoConnection,
        },
        { provide: getModelToken(Product.name), useValue: BooksModule },
      ],
    }).compile();

    // request = () => supertest(app.getHttpServer()).post('/graphql');

    app = moduleFixture.createNestApplication();
    await app.listen(0);
    url = await app.getUrl();
    pactum.request.setBaseUrl(url.replace('[::1]', 'localhost'));
  });
  it('Should retrive data', async () => {
    return pactum
      .spec()
      .post('/graphql')
      .withGraphQLQuery(
        `query Query {
        hello 
      }`,
      )
      .expectStatus(200)
      .expectBody({ data: { hello: 'helloo' } });
  });
  it('Should create an cat data ', async () => {
    const createAssignmentInput = {
      _id: 'dfgbdfafsca45ddlsfd',
      isAdded: true,
      isFeatured: true,
    };
    await pactum
      .spec()
      .post('/graphql')
      .withGraphQLQuery(
        `mutation CreateProduct($createAssignmentInput: CreateProductInput!) {
          createProduct(createAssignmentInput: $createAssignmentInput) {
            isAdded
          }
        }`,
      )
      .withGraphQLVariables({
        createAssignmentInput,
      })
      .expectStatus(200)
      .expectJson({
        data: {
          createProduct: {
            isAdded: true,
          },
        },
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
