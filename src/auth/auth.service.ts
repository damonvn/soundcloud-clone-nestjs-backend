import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(pass, user.password);
            if (isValid === true) {
                return user;
            }
        }

        return null;
    }

    async verifyRefreshToken(refreshToken: string) {
        try {
            const decodedToken = this.jwtService.verify(refreshToken);
            return decodedToken;
        } catch (error) {
            // Xử lý lỗi khi refresh token không hợp lệ hoặc đã hết hạn
            throw new Error('Invalid or expired refresh token');
        }
    }

    async login(user: any) {
        const { _id, name, email, role, age, gender, address, isVerify } = user;
        const payload = {
            sub: 'token login',
            iss: 'from server',
            _id,
            name,
            email,
            role,
            age,
            isVerify,
            gender,
            address,
        };
        const refreshTokenExpiration = ms(this.configService.get<string>('EXPRESS_SESSION_COOKIE'));
        const refresh_token = this.jwtService.sign(payload, { expiresIn: refreshTokenExpiration });
        await this.usersService.updateRefreshToken(_id, refresh_token);
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token,
            user: {
                _id,
                username: '',
                name,
                email,
                role,
                age,
                isVerify,
                gender,
                address,
            },
        };
    }
}
