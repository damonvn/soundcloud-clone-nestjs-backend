import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Email must be email type' })
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    password: string;
    name: string;
    role: string;
    address: string;
    age: number;
    gender: string;
    isVerify: boolean;
    type: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}
