import config from '@common/config';

export class MongooseUrl {
    public getHost = () => this.dbInfo.host;
    public getName = () => this.dbInfo.name;
    private dbInfo: { host: string, name: string } = config.db;
    
    public toString() {
        return 'mongodb://' + this.getHost() + '/' + this.getName();
    }
}
