import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import Widget from './widget.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class WidgetService extends TypeOrmCrudService<Widget> {
  constructor(
    @InjectRepository(Widget) protected readonly repo: Repository<Widget>) {
    super(repo);
  }
}
