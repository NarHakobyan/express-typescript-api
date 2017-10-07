'use strict';

import { BodyParams, Controller, Post, Req, Required, Res } from 'ts-express-decorators';
import { UserService } from '@services/user.service';
import { BadRequest } from 'ts-httpexceptions';
import config from '@common/config';
import * as jwt from 'jsonwebtoken';
import * as Express from 'express';

@Controller('/auth')
export class PassportCtrl {
    
    constructor(public userService: UserService) {}
    
    @Post('/login')
    public async login(
        @Required() @BodyParams('email') email: string,
        @Required() @BodyParams('password') password: string,
        @Req() request: Express.Request,
        @Res() response: Express.Response) {
        const user = await this.userService.findByCredentials(email, password);
        if (!user) {
            throw new BadRequest('Email or password is incorrect');
        }
        const token = jwt.sign({ id: user._id }, config.jwtSecret);
        return { user, token };
    }
}
