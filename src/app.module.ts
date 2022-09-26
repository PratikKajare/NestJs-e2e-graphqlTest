import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './product/product.module';
import { ConfigurationModule } from './config/config.module';
import configuration from './config/configuration';
// import * as Joi from 'joi';

// const dbHost = ConfigService.get<string>('database').mongoDb;
@Module({
  imports: [
    BooksModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
      load: [configuration],
      ELASTIC_NODE: process.env.ELASTIC_NODE,
      // ELASTIC_NODE:Joi.number()
    }),
    MongooseModule.forRoot(configuration().database.mongoDb),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
