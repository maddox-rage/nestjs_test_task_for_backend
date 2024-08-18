import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from '@prisma/client';
import { CardDto } from './card.dto';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { NotEmptyPipe } from 'src/pipes/notEmpty.pipe';

@Controller('users/:userId/columns/:columnId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get(':id')
  async getCardById(
    @Param('id') id: number,
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
  ): Promise<Card | null> {
    return this.cardService.getCardById(
      Number(id),
      Number(columnId),
      Number(userId),
    );
  }

  @Get()
  async getCardsByColumnId(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Card[] | null> {
    return this.cardService.getCardsByColumnId(columnId, userId);
  }

  @Post()
  async createCard(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Body(NotEmptyPipe) cardData: CardDto,
  ): Promise<Card> {
    return this.cardService.createCard(columnId, cardData);
  }

  @Put(':id')
  async updateCard(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) id: number,
    @Body('title') newTitle: string,
  ): Promise<Card> {
    return this.cardService.updateCard(columnId, id, newTitle, userId);
  }
  @Delete(':id')
  async deleteCard(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('columnId', ParseIdPipe) columnId: number,
  ): Promise<Card> {
    return this.cardService.deleteCard(columnId, id, userId);
  }
}
