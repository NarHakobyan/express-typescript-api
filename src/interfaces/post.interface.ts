import { Document, Schema } from 'mongoose';

export interface IPost {
    title: string;
    description: string;
    userId: Schema.Types.ObjectId;
}

export interface IPostModel extends Document, IPost {

}
