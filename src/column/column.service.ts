import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateColumnDto } from './dto/createColumn.dto';
import { Column } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { UpdateColumnDto } from './dto/updateColumn.dto';

@Injectable()
export class ColumnsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createColumn(userId: number, dto: CreateColumnDto): Promise<Column> {
    return await this.prisma.column.create({
      data: {
        title: dto.title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getColumnById(columnId: number, userId: number): Promise<Column> {
    await this.userService.getUserById(userId);
    const column = await this.prisma.column.findUnique({
      where: {
        id: columnId,
        userId: userId,
      },
    });
    if (!column) {
      throw new NotFoundException('Column not found');
    }
    return column;
  }

  async getColumnsByUserId(userId: number): Promise<Column[]> {
    await this.userService.getUserById(userId);
    const columns = await this.prisma.column.findMany({
      where: {
        userId: userId,
      },
    });
    if (!columns || columns.length === 0) {
      throw new NotFoundException('Columns not found');
    }
    return columns;
  }

  async updateColumn(
    columnId: number,
    userId: number,
    newTitle: UpdateColumnDto,
  ): Promise<Column> {
    await this.getColumnById(columnId, userId);
    return await this.prisma.column.update({
      where: { id: columnId, userId },
      data: {
        title: newTitle.title,
      },
    });
  }

  async deleteColumn(columnId: number, userId: number): Promise<Column> {
    await this.getColumnById(columnId, userId);
    return this.prisma.column.delete({
      where: { id: columnId },
    });
  }
}
