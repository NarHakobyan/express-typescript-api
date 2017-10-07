import { MongooseService } from '@services/mongoose.service';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from 'ts-express-decorators';
import { $log } from 'ts-log-debug';

const rootDir = path.resolve(__dirname);

@ServerSettings({
    acceptMimes: ['application/json'],
    rootDir,
    port: 8081,
    mount: {
        '/api': `${rootDir}/http/controllers/**/*.controller.ts`,
    },
    componentsScan: [
        `${rootDir}/services/**/*.ts`,
        `${rootDir}/middlewares/**/*.ts`,
    ],
    passport: {},
    httpsPort: false,
})
export class Server extends ServerLoader {
    
    public $onInit(): Promise<any> {
        return MongooseService.connect();
    }
    
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void | Promise<any> {
        this.use(GlobalAcceptMimesMiddleware)
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true,
            }));
    }
    
    public $onReady() {
        // console.log(this.settings);
    }
    
    public $onServerInitError(err) {
        $log.error('error', err);
    }
}

export default Server;
