import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import bcrypt, { compareSync } from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    // create(createUserDto: CreateUserDto) {
    //     return 'This action adds a new user';
    // }

    getHashPassword = (password: string) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    };

    isValidPassword(hash: string, plain: string) {
        return compareSync(hash, plain);
    }

    async create(createUserDto: CreateUserDto) {
        const hashPassword = this.getHashPassword(createUserDto.password);
        let user = await this.userModel.create({
            email: createUserDto.email,
            password: hashPassword,
            name: createUserDto.name,
            role: createUserDto.role,
            age: createUserDto.age,
            gender: createUserDto.gender,
            address: createUserDto.address,
        });

        return user;
    }

    findAll() {
        return `This action returns all users`;
    }

    async findOne(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) return 'Not find user';
        return this.userModel.findOne({ _id: id });
    }

    async findOneByUsername(username: string) {
        return await this.userModel.findOne({ email: username });
    }

    async updateRefreshToken(id: string, refresh_token: string): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, { refreshToken: refresh_token }, { new: true });
        return updatedUser;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
