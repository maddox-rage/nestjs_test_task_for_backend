import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '@prisma/client';
import { CommentDto } from './comment.dto';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { NotEmptyPipe } from 'src/pipes/notEmpty.pipe';

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  async getCommentById(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('cardId', ParseIdPipe) cardId: number,
    @Param('columnId', ParseIdPipe) columnId: number,
  ): Promise<Comment | null> {
    return this.commentService.getCommentById(id, cardId, columnId, userId);
  }

  @Get()
  async getCommentByCardId(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('cardId', ParseIdPipe) cardId: number,
    @Param('columnId', ParseIdPipe) columnId: number,
  ): Promise<Comment[] | null> {
    return this.commentService.getCommentByCardId(cardId, userId, columnId);
  }

  @Post()
  async createComment(
    @Param('cardId', ParseIdPipe) cardId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('columnId', ParseIdPipe) columnId: number,
    @Body(NotEmptyPipe) commentData: CommentDto,
  ): Promise<Comment> {
    return this.commentService.createComment(cardId, userId, commentData);
  }

  @Put(':id')
  async updateComment(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) id: number,
    @Param('cardId', ParseIdPipe) cardId: number,
    @Body('text') newText: string,
  ): Promise<Comment> {
    return this.commentService.updateComment(
      id,
      columnId,
      cardId,
      userId,
      newText,
    );
  }

  @Delete(':id')
  async deleteComment(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) id: number,
    @Param('cardId', ParseIdPipe) cardId: number,
  ): Promise<Comment> {
    return this.commentService.deleteComment(id, cardId, columnId, userId);
  }
}
