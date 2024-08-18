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
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { NotEmptyPipe } from 'src/pipes/notEmpty.pipe';

@Controller('users/:userId/columns')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @Get(':id')
  async getColumnById(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Column | null> {
    return this.columnService.getColumnById(id, userId);
  }

  @Get()
  async getColumnsByUserId(
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Column[] | null> {
    return this.columnService.getColumnsByUserId(userId);
  }

  @Post()
  async createColumn(
    @Param('userId', ParseIdPipe) userId: number,
    @Body(NotEmptyPipe) columnData: ColumnDto,
  ): Promise<Column> {
    return this.columnService.createColumn(userId, columnData);
  }

  @Put(':id')
  async updateColumn(
    @Param('id', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Body('title') newTitle: string,
  ): Promise<Column> {
    return this.columnService.updateColumn(columnId, userId, newTitle);
  }

  @Delete(':id')
  async deleteColumn(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) columnId: number,
  ): Promise<Column> {
    return this.columnService.deleteColumn(columnId, userId);
  }
}
