import { IPostModel } from '@interfaces/post.interface';
import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const Post = model<IPostModel>('Post', PostSchema);
