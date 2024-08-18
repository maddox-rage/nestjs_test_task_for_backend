import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CardDto } from './card.dto';
import { Card } from '@prisma/client';
import { ColumnsService } from 'src/column/column.service';

@Injectable()
export class CardService {
  constructor(
    private readonly columnsService: ColumnsService,
    private readonly prisma: PrismaService,
  ) {}
  async createCard(columnId: number, dto: CardDto): Promise<Card> {
    return await this.prisma.card.create({
      data: {
        title: dto.title,
        column: {
          connect: {
            id: columnId,
          },
        },
      },
    });
  }
  async getCardById(
    cardId: number,
    columnId: number,
    userId: number,
  ): Promise<Card> {
    await this.columnsService.getColumnById(columnId, userId);
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
        columnId: columnId,
      },
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return card;
  }
  async getCardsByColumnId(columnId: number, userId: number): Promise<Card[]> {
    await this.columnsService.getColumnById(columnId, userId);
    const cards = await this.prisma.card.findMany({
      where: {
        columnId: columnId,
      },
    });
    if (!cards || cards.length === 0) {
      throw new NotFoundException('Cards not found');
    }
    return cards;
  }
  async updateCard(
    columnId: number,
    cardId: number,
    newTitle: string,
    userId: number,
  ): Promise<Card> {
    await this.getCardById(cardId, columnId, userId);
    return await this.prisma.card.update({
      where: { id: cardId, columnId },
      data: {
        title: newTitle,
      },
    });
  }
  async deleteCard(
    columnId: number,
    cardId: number,
    userId: number,
  ): Promise<Card> {
    await this.getCardById(cardId, columnId, userId);
    return this.prisma.card.delete({
      where: { id: cardId },
    });
  }
}
