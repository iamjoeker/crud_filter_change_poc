import { Test, TestingModule } from '@nestjs/testing';
import { CrudFilterPocController } from './crud-filter-poc.controller';
import WidgetService from './widget.service';

describe('CrudFilterPoc Controller', () => {
  let controller: CrudFilterPocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ CrudFilterPocController ],
      providers: [
        {
          provide: 'WidgetService',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CrudFilterPocController>(CrudFilterPocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
