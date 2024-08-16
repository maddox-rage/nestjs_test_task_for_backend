import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ColumnsService } from './column.service';
import { Column } from '@prisma/client';
import { ColumnDto } from './column.dto';

@Controller('users/:userId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get(':id')
  async getColumnById(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ): Promise<Column | null> {
    return this.columnsService.getColumnById(Number(id), Number(userId));
  }

  @Get()
  async getColumnsByUserId(
    @Param('userId') userId: number,
  ): Promise<Column[] | null> {
    return this.columnsService.getColumnsByUserId(Number(userId));
  }

  @Post()
  async createColumn(
    @Param('userId') userId: number,
    @Body() columnData: ColumnDto,
  ): Promise<Column> {
    return this.columnsService.createColumn(Number(userId), columnData);
  }
  @Put(':id')
  async updateColumn(
    @Param('id') columnId: number,
    @Param('userId') userId: number,
    @Body('title') newTitle: string,
  ): Promise<Column> {
    return this.columnsService.updateColumn(
      Number(columnId),
      Number(userId),
      newTitle,
    );
  }
  @Delete(':id')
  async deleteColumn(
    @Param('userId') userId: number,
    @Param('id') columnId: number,
  ): Promise<Column> {
    return this.columnsService.deleteColumn(Number(columnId), Number(userId));
  }
}
