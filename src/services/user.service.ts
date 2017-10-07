import { IUserModel } from '@interfaces/user.interface';
import { User } from '@models/User';
import { Service } from 'ts-express-decorators';

@Service()
export class UserService {
    
    public async find(id: string): Promise<IUserModel> {
        return User.findById(id);
    }
    
    public async findAll(): Promise<IUserModel[]> {
        return User.find();
    }
    
    public async save(user: IUserModel): Promise<IUserModel> {
        await user.validate();
        await user.update(user, { upsert: true });
        
        return user;
    }
    
    public async findByCredentials(name: string, password: string): Promise<IUserModel | null> {
        const user: IUserModel = await User.findOne({ $or: [{ email: name }, { username: name }] });
        if (!user) {
            return null;
        }
        const isPasswordCorrect = await user.comparePassport(password);
        return isPasswordCorrect ? user : null;
    }
    
    public async remove(id: string): Promise<void> {
        await User.findById(id).remove().exec();
    }
}
