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
import { CardService } from './card.service';
import { Card } from '@prisma/client';
import { CreateCardDto } from './dto/createCard.dto';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { NotEmptyPipe } from 'src/pipes/notEmpty.pipe';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { OwnerGuard } from 'src/guards/owner.guard';
import { UpdateCardDto } from './dto/updateCard.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('users/:userId/columns/:columnId/cards')
@ApiTags('Cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a card by ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Card ID' })
  @ApiResponse({ status: 200, description: 'Card details' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async getCardById(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('columnId', ParseIdPipe) columnId: number,
  ): Promise<Card | null> {
    return this.cardService.getCardById(id, columnId, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all cards for a column' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of cards' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getCardsByColumnId(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
  ): Promise<Card[] | null> {
    return this.cardService.getCardsByColumnId(columnId, userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({ status: 201, description: 'Card created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createCard(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Body(NotEmptyPipe) cardData: CreateCardDto,
  ): Promise<Card> {
    return this.cardService.createCard(columnId, cardData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a card by ID' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Card ID' })
  @ApiResponse({ status: 200, description: 'Card updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async updateCard(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) id: number,
    @Body() newTitle: UpdateCardDto,
  ): Promise<Card> {
    return this.cardService.updateCard(columnId, id, newTitle, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a card by ID' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Card ID' })
  @ApiResponse({ status: 200, description: 'Card deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async deleteCard(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('columnId', ParseIdPipe) columnId: number,
  ): Promise<Card> {
    return this.cardService.deleteCard(columnId, id, userId);
  }
}
