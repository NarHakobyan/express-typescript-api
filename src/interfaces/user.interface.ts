import { Document } from 'mongoose';

export interface IUser {
    fullName: string;
    userName: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser, Document {
    comparePassport: (password: string) => Promise<boolean>;
}
