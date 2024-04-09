import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Public } from '@/decorator/customize';
import { UsersService } from '@/users/users.service';
import { isEmpty } from 'class-validator';

@Controller('api/v1/tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}

    @Post()
    create(@Body() createTrackDto: CreateTrackDto) {
        return this.tracksService.create(createTrackDto);
    }

    @Public()
    @Post('top')
    async getTopTracks(@Body('category') category: string) {
        try {
            const topTracks = await this.tracksService.findTrackByCategory(category);
            if (topTracks.length !== 0) {
                return {
                    data: topTracks,
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

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const track = await this.tracksService.findOne(id);
            if (track) {
                return {
                    data: track,
                    status: 200,
                    message: 'Success',
                };
            } else {
                return {
                    data: null,
                    status: 200,
                    message: 'Success',
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

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    //     return this.tracksService.update(+id, updateTrackDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tracksService.remove(+id);
    }
}
