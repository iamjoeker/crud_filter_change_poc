import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudFilterPocModule } from './crud-filter-poc/crud-filter-poc.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    CrudFilterPocModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './mydb.sqlite',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {
}
