import * as mongoose from 'mongoose';
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/myapp', {useMongoClient: true}).then(() => {
        console.log('Successfully connected to mongoDB'); // tslint:disable-line
    },
);
