import { Injectable, NotFoundException } from '@nestjs/common';
import { CardService } from 'src/card/card.service';
import { PrismaService } from 'src/prisma.service';
import { CommentDto } from './comment.dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(
    private readonly cardsService: CardService,
    private readonly prisma: PrismaService,
  ) {}

  async createComment(
    cardId: number,
    userId: number,
    dto: CommentDto,
  ): Promise<Comment> {
    return await this.prisma.comment.create({
      data: {
        text: dto.text,
        card: {
          connect: {
            id: cardId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  async getCommentById(
    commentId: number,
    cardId: number,
    columnId: number,
    userId: number,
  ): Promise<Comment> {
    await this.cardsService.getCardById(cardId, columnId, userId);
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
        cardId: cardId,
      },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }
  async getCommentByCardId(
    cardId: number,
    userId: number,
    columnId: number,
  ): Promise<Comment[]> {
    await this.cardsService.getCardById(cardId, columnId, userId);
    const comments = await this.prisma.comment.findMany({
      where: {
        cardId: cardId,
      },
    });
    if (!comments || comments.length === 0) {
      throw new NotFoundException('Comments not found');
    }
    return comments;
  }
  async updateComment(
    commentId: number,
    columnId: number,
    cardId: number,
    userId: number,
    newText: string,
  ): Promise<Comment> {
    await this.getCommentById(commentId, cardId, columnId, userId);
    return await this.prisma.comment.update({
      where: {
        id: commentId,
        cardId,
      },
      data: {
        text: newText,
      },
    });
  }
  async deleteComment(
    commentId: number,
    cardId: number,
    columnId: number,
    userId: number,
  ): Promise<Comment> {
    await this.getCommentById(commentId, cardId, columnId, userId);
    return this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
