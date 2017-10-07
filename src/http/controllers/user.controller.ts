import { Controller, Get, OnInit } from 'ts-express-decorators';
import * as Express from 'express';

export interface IUser {
    _id: string;
    name: string;
}

@Controller('/users')
export class UserController implements OnInit {
    public $onInit(): Promise<any> | void {
        console.log('$onInit');
    }

    /**
     * Example of classic call. Use `@Get` for routing a request to your method.
     * In this case, this route "/calendars/:id" are mounted on the "rest/" path.
     *
     * By default, the response is sent with status 200 and is serialized in JSON.
     *
     * @param request
     * @param response
     * @returns {{id: any, name: string}}
     */
    @Get('/:id')
    public async get(request: Express.Request, response: Express.Response) {
        return {id: request.params.id, name: 'test'};
    }

    @Get('/')
    public async allUsers(request: Express.Request, response: Express.Response) {
        console.log(request);
        return [{id: '1', name: 'test'}];
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
