import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { Item, ItemDocument } from './schema/item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  findAll(): Promise<ItemDocument[]> {
    return this.itemModel.find().sort({ section: 1, name: 1 }).exec();
  }

  create(data: CreateItemDto): Promise<ItemDocument> {
    return this.itemModel.create(data);
  }
}
