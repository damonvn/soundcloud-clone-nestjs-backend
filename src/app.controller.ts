import { Controller, Get, Post, Render, Req, Res, UseGuards, Request, Body } from '@nestjs/common';
import { AppService } from '@/app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Public } from '@/decorator/customize';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/api/v1/auth/login')
    async handleLogin(@Request() req: any) {
        const user = await this.authService.login(req.user);
        if (user) {
            return {
                data: user,
                status: 200,
                message: 'Success',
            };
        } else {
            return {
                data: null,
                status: 401,
                message: 'Unauthorized',
            };
        }
    }

    @Get('profile')
    getProfile(@Request() req, e) {
        return req.user;
    }

    @Public()
    @Get()
    findAll() {
        return 'Welcome to NestJS Stateless Backend!';
    }

    @Public()
    @Get()
    getHome(@Res() res: Response) {
        // Phục vụ index.html từ thư mục public
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }
}

//learn more at: https://www.loginradius.com/blog/engineering/guest-post/session-authentication-with-nestjs-and-mongodb/
//https://www.loginradius.com/blog/engineering/guest-post/session-authentication-with-nestjs-and-mongodb/
