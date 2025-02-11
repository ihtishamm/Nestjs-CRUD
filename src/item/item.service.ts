import { HttpException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const itemData = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(itemData);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Item[]> {
    const [items] = await this.itemRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return items;
  }

  async findOne(id: number): Promise<Item> {
    const itemData = await this.itemRepository.findOneBy({ id });
    if (!itemData) {
      throw new HttpException('Item Not Found', 404);
    }
    return itemData;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const existingItem = await this.findOne(id);
    const itemData = this.itemRepository.merge(existingItem, updateItemDto);
    return await this.itemRepository.save(itemData);
  }

  async remove(id: number): Promise<Item> {
    const existingItem = await this.findOne(id);
    return await this.itemRepository.remove(existingItem);
  }
}
