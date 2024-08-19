import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ColumnsService } from './column.service';
import { Column } from '@prisma/client';
import { CreateColumnDto } from './dto/createColumn.dto';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { NotEmptyPipe } from 'src/pipes/notEmpty.pipe';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { OwnerGuard } from 'src/guards/owner.guard';
import { UpdateColumnDto } from './dto/updateColumn.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('users/:userId/columns')
@ApiTags('Columns')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a column by ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Column details' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  async getColumnById(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Column | null> {
    return this.columnService.getColumnById(id, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all columns for a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of columns' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getColumnsByUserId(
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Column[] | null> {
    return this.columnService.getColumnsByUserId(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new column' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({ status: 201, description: 'Column created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createColumn(
    @Param('userId', ParseIdPipe) userId: number,
    @Body(NotEmptyPipe) columnData: CreateColumnDto,
  ): Promise<Column> {
    return this.columnService.createColumn(userId, columnData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a column by ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Column updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  async updateColumn(
    @Param('id', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Body() newTitle: UpdateColumnDto,
  ): Promise<Column> {
    return this.columnService.updateColumn(columnId, userId, newTitle);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a column by ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Column deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  async deleteColumn(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) columnId: number,
  ): Promise<Column> {
    return this.columnService.deleteColumn(columnId, userId);
  }
}
