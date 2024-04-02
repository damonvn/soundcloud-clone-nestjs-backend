import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schemas/track.schema';
import { UsersModule } from '@/users/users.module';
import { UsersService } from '@/users/users.service';

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }])],
    controllers: [TracksController],
    providers: [TracksService],
})
export class TracksModule {}
