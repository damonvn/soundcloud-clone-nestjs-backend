import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from '@/decorator/customize';

@Controller('api/v1')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Public()
    @Post('tracks/comments')
    async findAll(
        @Query('current') current: string,
        @Query('pageSize') pageSize: string,
        @Query('trackId') trackId: string,
        @Query('sort') sort: string,
    ) {
        try {
            const comments = await this.commentsService.findTrackComments(trackId, +current, +pageSize, sort);
            if (comments.length !== 0) {
                const data = {
                    result: comments,
                };
                return {
                    data: data,
                    status: 200,
                    message: 'Success',
                };
            } else {
                return {
                    data: null,
                    status: 404,
                    message: 'Not Found',
                };
            }
        } catch (e) {
            return {
                data: null,
                status: 500,
                error: 'Internal Server Error',
            };
        }
    }
}
