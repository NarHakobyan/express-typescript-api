import {Schema} from 'mongoose';

const UserSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    userId: { type: Schema.ObjectId, ref: "Post"},
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

export const User = mongoose.model('User', UserSchema);

export interface IUser {
    fullName: string;
    userName: string;
    email: string;
    password: string;
}