import * as production from './production.json';
import * as development from './development.json';

let config: any;
if (process.env.NODE_ENV === 'production') {
    config = production;
} else {
    config = development;
}

export default config;
