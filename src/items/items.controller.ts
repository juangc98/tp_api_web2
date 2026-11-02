import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { ItemDocument } from './schema/item.schema';

@Controller('items')
@UseGuards(AuthGuard)
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  async findAll() {
    const items = await this.itemsService.findAll();
    return {
      title: this.config.get<string>('CATALOG_TITLE') ?? 'Mi catalogo',
      items: items.map((item) => this.toResponse(item)),
    };
  }

  @Post()
  async create(@Body() data: CreateItemDto) {
    return this.toResponse(await this.itemsService.create(data));
  }

  private toResponse(item: ItemDocument) {
    return {
      id: item.id,
      name: item.name,
      section: item.section,
      description: item.description,
      price: item.price,
    };
  }
}
