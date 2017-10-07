import * as Mongoose from 'mongoose';
import { Service } from 'ts-express-decorators';
import { $log } from 'ts-log-debug';
import { MongooseUrl } from './mongoose-url.servoce';

Mongoose.Promise = global.Promise;

@Service()
export class MongooseService {
    
    public static connection: Mongoose.Connection;
    public getResource = (): Mongoose.Connection => MongooseService.connection;
    
    public static async connect(): Promise<Mongoose.Connection> {
        
        if (MongooseService.connection) {
            return Promise.resolve(MongooseService.connection);
        }
        
        $log.debug('new MongooseUrl().toString()', new MongooseUrl().toString());
        MongooseService.connection = await Mongoose.connect(new MongooseUrl().toString(), { useMongoClient: true });
        
        return MongooseService.connection;
    }
}
