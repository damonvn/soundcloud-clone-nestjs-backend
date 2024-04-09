import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    moment: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
    track: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: mongoose.Schema.Types.ObjectId;

    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
