import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentDto {
    content: string;
    moment: number;
    user: string;
    track: string;
}
