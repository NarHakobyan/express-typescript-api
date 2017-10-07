import { isValidObjectId } from '@common/helpers';
import { User } from '@models/User';
import * as Express from 'express';
import { Authenticated, Controller, Get, PathParams, Post, Status } from 'ts-express-decorators';

@Controller('/users')
export class UserController {
    
    @Get('/')
    @Authenticated()
    public async getAllUsers(request: Express.Request, response: Express.Response) {
        return User.find();
    }
    
    @Get('/:id')
    public async getSingleUser(@PathParams('id') id: number) {
        if (isValidObjectId(id)) {
            return User.findById(id);
        } else {
            return 0;
        }
    }
    
    @Post('/')
    @Status(201)
    public async addUser(req: Express.Request, res: Express.Response) {
        return User.create(req.body);
    }
    
    /*@Post('/')
    @Authenticated()
    public async post(@Required() @BodyParams('calendar') calendar: Calendar): Promise<ICalendar> {

        return new Promise((resolve: Function, reject: Function) => {

            calendar.id = 1;

            resolve(calendar);

        });
    }

    @Delete('/')
    @Authenticated()
    public async post(@BodyParams('calendar.id') @Required() id: string): Promise<ICalendar> {

        return new Promise((resolve: Function, reject: Function) => {

            calendar.id = id;

            resolve(calendar);

        });
    }*/
}
