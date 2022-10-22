import { Load } from './lib/load'
import db from './lib/db';
import hash from './lib/hash';
import staticServer from './lib/static';
import logger from './lib/logger';
import config from './config';

(async () => {
    const sandbox = {
        db: Object.freeze(db),
        common: {
            hash: Object.freeze(hash),
            logger: Object.freeze(logger),
        },
    };
    const server = (await import(`./lib/${config.api.transport}.ts`))['default'];
    const routing = await Load.loadApiRoutes(sandbox, '../api/', './');
    staticServer('./static', config.static.port);
    server(routing, config.api.port);
})();
