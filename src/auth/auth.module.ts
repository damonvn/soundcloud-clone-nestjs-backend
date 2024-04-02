import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { UsersModule } from '@/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ms from 'ms';
import { LocalStrategy } from '@/auth/passport/local.strategy';
import { JwtStrategy } from '@/auth/passport/jwt.strategy';

@Module({
    providers: [AuthService, LocalStrategy, JwtStrategy],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_ACCESS_TOKEN'),
                signOptions: {
                    expiresIn: ms(configService.get<string>('JWT_ACCESS_EXPIRED')),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [AuthService],
})
export class AuthModule {}
