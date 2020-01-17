import { Module } from '@nestjs/common';
import { CrudFilterPocController } from './crud-filter-poc.controller';
import Widget from './widget.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import WidgetService from './widget.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Widget ]) ],
  controllers: [ CrudFilterPocController ],
  providers: [ WidgetService ],
})
export class CrudFilterPocModule {
}
