import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '@/users/users.service';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private CommentModel: Model<Comment>, private usersService: UsersService) {}
    create(createCommentDto: CreateCommentDto) {
        return 'This action adds a new comment';
    }

    findAll() {
        return `This action returns all comments`;
    }

    async findTrackComments(trackId: string, current: number, pageSize: number, sort: string) {
        const skip = pageSize * (current - 1);
        const comments = await this.CommentModel.find({ track: trackId })
            .select('-deletedAt')
            .populate({
                path: 'user',
                select: '_id email name role type',
            })
            .sort(sort)
            .skip(skip)
            .limit(pageSize)
            .exec();
        return comments;
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
