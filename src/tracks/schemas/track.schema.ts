import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    trackUrl: string;

    @Prop()
    imgUrl: string;

    @Prop()
    category: string;

    @Prop()
    countLike: number;

    @Prop()
    countPlay: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    uploader: mongoose.Schema.Types.ObjectId;

    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
