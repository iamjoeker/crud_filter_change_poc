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

    {
      id: 4,
      name: 'Entity 4',
      remoteId: 10,
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          dropSchema: true,
          entities: [
            './src/**/*.entity{.ts,.js}',
          ],
          logger: 'advanced-console',
          logging: 'all',
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

  afterAll(async () => {
    // httpServer.close();
    await app.close();
  });

  it('/crud (GET)', async () => {
    return request(app.getHttpServer())
      .get('/crud')
      .expect(200)
      .expect([ fixtures[0], fixtures[3] ]);
  });

  it('/crud/3 (GET) 404', async () => {
    return request(app.getHttpServer())
      .get('/crud/3')
      .expect(404);
  });

  it('/crud?filter=remoteId||$eq||10 returns fixtures[0]', async () => {
    return request(app.getHttpServer())
      .get('/crud?filter=remoteId||$eq||10')
      .expect(200)
      .expect([ fixtures[0], fixtures[3] ]);
  });
});
