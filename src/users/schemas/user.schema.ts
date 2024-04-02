import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    name: string;

    @Prop()
    role: string;

    @Prop()
    address: string;

    @Prop()
    age: number;

    @Prop()
    gender: string;

    @Prop()
    isVerify: boolean;

    @Prop()
    type: string;

    @Prop()
    refreshToken: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
