import * as argon2 from 'argon2';
import { IUserModel } from 'interfaces/user.interface';
import { Model, model as MongooseModel, Schema } from 'mongoose';
import { isEmail } from 'validator';

const UserSchema = new Schema({
    fullName: {
        $type: String,
        required: [true, 'Name is required'],
    },
    userName: {
        $type: String,
        required: [true, 'User name is required'],
        unique: true,
    },
    email: {
        $type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: isEmail,
            message: '{VALUE} is not a valid email!',
        },
    },
    password: { $type: String, required: true },
}, {
    typeKey: '$type',
    timestamps: true,
});

// real inheritance
class UserModel extends Model {
    public fullName: string;
    public userName: string;
    public email: string;
    public password: string;
    
    public static async encryptPassword(password: string): Promise<string> {
        return argon2.hash(password);
    }
    
    public async comparePassport(password: string): Promise<boolean> {
        return argon2.verify(this.password, password);
    }
    
    // pre/post-save hook works
    public async save(options, next) {
        if (super.isModified('password')) {
            this.password = await UserModel.encryptPassword(this.password);
        }
        return super.save(options, next);
    }
}

UserSchema.loadClass(UserModel);
export const User = MongooseModel<IUserModel>('User', UserSchema);
