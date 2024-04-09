import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import mongoose, { Model } from 'mongoose';
import { Track } from './schemas/track.schema';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { UsersService } from '@/users/users.service';
import { map } from 'rxjs';

@Injectable()
export class TracksService {
    constructor(@InjectModel(Track.name) private trackModel: Model<Track>, private usersService: UsersService) {}
    create(createTrackDto: CreateTrackDto) {
        return 'This action adds a new track';
    }

    findAll() {
        return `This action returns all tracks`;
    }

    async findTrackByCategory(category: string) {
        const tracks = await this.trackModel
            .find({ category: category })
            .select('-deletedAt -__v')
            .populate({
                path: 'uploader',
                select: '_id email name role type',
            })
            .exec();
        return tracks;
    }

    async findOne(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) return 'Not find track';
        const tracks = await this.trackModel
            .findOne({ _id: id })
            .select('-deletedAt -__v')
            .populate({
                path: 'uploader',
                select: '_id email name role type',
            })
            .exec();
        return tracks;
    }

    update(id: number, updateTrackDto: UpdateTrackDto) {
        return 'update';
    }

    remove(id: number) {
        return `This action removes a #${id} track`;
    }
}
