import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from 'ts-express-decorators';
import bodyParser = require('body-parser');
import Path = require('path');

@ServerSettings({
    acceptMimes: ['application/json'],
    rootDir: Path.resolve(__dirname),
    port: 8081,
    mount: {
        '/api': '${rootDir}/http/controllers/**/*.controller.ts',
    },
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void | Promise<any> {

        this
            .use(GlobalAcceptMimesMiddleware)
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true,
            }));
    }

    public $onReady() {
        // console.log(this.settings);
    }

    public $onServerInitError(err) {
        console.error('error', err);
    }
}

export default Server;
