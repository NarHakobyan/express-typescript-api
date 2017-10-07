import { Types } from 'mongoose';

export const isValidObjectId = (id: string | number) => {
    return Types.ObjectId.isValid(id);
};
