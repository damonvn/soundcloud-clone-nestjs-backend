import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
    @ApiProperty({ example: 'My Title', description: 'The title of the track' })
    @IsNotEmpty({ message: 'Title must not be empty' })
    title: string;

    @ApiProperty({ example: 'My Description', description: 'The description of the track' })
    @IsNotEmpty({ message: 'Description must not be empty' })
    description: string;

    @ApiProperty({ example: 'My Category', description: 'The category of the track' })
    @IsNotEmpty({ message: 'Category must not be empty' })
    category: string;

    @ApiProperty({ example: 'http://example.com/track.mp3', description: 'The URL of the track' })
    @IsNotEmpty({ message: 'Track URL must not be empty' })
    trackUrl: string;

    @ApiProperty({ example: 'http://example.com/image.jpg', description: 'The URL of the track image' })
    @IsNotEmpty({ message: 'Image URL must not be empty' })
    imgUrl: string;
}
