import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import Widget from '../src/crud-filter-poc/widget.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudFilterPocModule } from '../src/crud-filter-poc/crud-filter-poc.module';

describe('CrudFilterPocController (e2e)', () => {
  let app;
  const fixtures: Widget[] = [
    {
      id: 1,
      name: 'Entity 1',
      remoteId: 10,
    },

    {
      id: 2,
      name: 'Entity 2',
      remoteId: 20,
    },

    {
      id: 3,
      name: 'Entity 3',
      remoteId: 30,
    },
  ];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: './mydb_test.sqlite',
          synchronize: true,
          dropSchema: true,
          entities: [
            './src/**/*.entity{.ts,.js}',
          ],
        }),
        CrudFilterPocModule,
        TypeOrmModule.forFeature([ Widget ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const repo: Repository<Widget> = app.get('WidgetRepository');
    await repo.insert(fixtures);
  });

  it('/crud (GET)', () => {
    const server = app.getHttpServer();

    return request(server)
      .get('/crud')
      .expect(200)
      .expect([ fixtures[0] ]);
  });
});
