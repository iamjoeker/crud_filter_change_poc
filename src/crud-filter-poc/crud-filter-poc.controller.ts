import { Controller } from '@nestjs/common';
import Widget from './widget.entity';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';
import { Crud, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import WidgetService from './widget.service';

@Crud({
  model: {
    type: Widget,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
    remoteId: {
      field: 'remoteId',
      type: 'number',
    },
  },
})
@Controller('crud')
export class CrudFilterPocController implements CrudController<Widget> {
  constructor(public readonly service: WidgetService) {
  }

  get base(): CrudController<Widget> {
    return this;
  }

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    // Simulating user only having access to remoteId == 10

    req.parsed.filter.push({
      field: 'remoteId',
      operator: '$eq',
      value: 10,
    });

    // tslint:disable-next-line:no-console
    console.debug('ParsedRequest', JSON.stringify(req));

    return await this.base.getManyBase(req);
  }
}
