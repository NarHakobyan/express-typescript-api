import { IPostModel } from '@interfaces/post.interface';
import { Post } from '@models/Post';
import { Service } from 'ts-express-decorators';

@Service()
export class PostService {
    
    public async find(id: string): Promise<IPostModel> {
        return Post.findById(id);
    }
    
    public async findAll(): Promise<IPostModel[]> {
        return Post.find();
    }
    
    public async save(post: IPostModel): Promise<IPostModel> {
        await post.validate();
        await post.update(post, { upsert: true });
        return post;
    }
    
    public async findByUser(userId: string): Promise<IPostModel[]> {
        const posts = await Post.find({ userId });
        return posts;
    }
    
    public async remove(id: string): Promise<void> {
        await Post.findById(id).remove().exec();
    }
}
