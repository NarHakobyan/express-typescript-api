import { MongooseDocument } from 'mongoose';

export interface IUser {
    fullName: string;
    userName: string;
    email: string;
    password: string;
}

export interface IUserModel extends MongooseDocument, IUser {
    comparePassport: (password: string) => Promise<boolean>;
}