import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('items')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
    type: Item,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'List of all items.', type: [Item] })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.itemService.findAll(page, limit);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a single item by ID' })
  @ApiResponse({ status: 200, description: 'The item found', type: Item })
  @ApiResponse({ status: 404, description: 'Item not found' })
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully updated.',
    type: Item,
  })
  @ApiResponse({ status: 404, description: 'Item not found' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Item not found' })
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
