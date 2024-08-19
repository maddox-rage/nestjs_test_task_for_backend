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
import { CommentService } from './comment.service';
import { Comment } from '@prisma/client';
import { CreateCommentDto } from './dto/createComment.dto';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { NotEmptyPipe } from 'src/pipes/notEmpty.pipe';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { OwnerGuard } from 'src/guards/owner.guard';
import { UpdateCommentDto } from './dto/updateComment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiParam({ name: 'cardId', type: Number, description: 'Card ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'Comment details' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async getCommentById(
    @Param('id', ParseIdPipe) id: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('cardId', ParseIdPipe) cardId: number,
    @Param('columnId', ParseIdPipe) columnId: number,
  ): Promise<Comment | null> {
    return this.commentService.getCommentById(id, cardId, columnId, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get comments by card ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'cardId', type: Number, description: 'Card ID' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiResponse({
    status: 200,
    description: 'List of comments',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getCommentByCardId(
    @Param('userId', ParseIdPipe) userId: number,
    @Param('cardId', ParseIdPipe) cardId: number,
    @Param('columnId', ParseIdPipe) columnId: number,
  ): Promise<Comment[] | null> {
    return this.commentService.getCommentByCardId(cardId, userId, columnId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'cardId', type: Number, description: 'Card ID' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiResponse({ status: 201, description: 'Comment created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createComment(
    @Param('cardId', ParseIdPipe) cardId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('columnId', ParseIdPipe) columnId: number,
    @Body(NotEmptyPipe) commentData: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentService.createComment(cardId, userId, commentData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiParam({ name: 'cardId', type: Number, description: 'Card ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'Comment updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async updateComment(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) id: number,
    @Param('cardId', ParseIdPipe) cardId: number,
    @Body() newText: UpdateCommentDto,
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
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'columnId', type: Number, description: 'Column ID' })
  @ApiParam({ name: 'cardId', type: Number, description: 'Card ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'Comment deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async deleteComment(
    @Param('columnId', ParseIdPipe) columnId: number,
    @Param('userId', ParseIdPipe) userId: number,
    @Param('id', ParseIdPipe) id: number,
    @Param('cardId', ParseIdPipe) cardId: number,
  ): Promise<Comment> {
    return this.commentService.deleteComment(id, cardId, columnId, userId);
  }
}
