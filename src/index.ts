const fsp = require('node:fs').promises;
const path = require('node:path');
import load from './lib/load';
import db from './lib/db';
import server from './lib/ws';
import staticServer from './lib/static';
import logger from './lib/logger';
const vm = require('node:vm');
import {transpile} from 'typescript';


const jsCode = transpile('TS-CODE', {inlineSourceMap: true}, path.resolve(__dirname, './api/city.ts'));
console.log(jsCode);

//const code = `'use strict';\n${jsCode}`;
const script = new vm.Script(jsCode);

const RUN_OPTIONS = { timeout: 5000, displayErrors: false };

console.log({ script });
const context = vm.createContext(Object.freeze({ }));
const exported = script.runInContext(context, RUN_OPTIONS);
console.log({ exported });

const sandbox = {
    logger: Object.freeze(logger),
    db: Object.freeze(db),
    common: { },
};

const apiPath = path.join(__dirname, './api');
const routing = {};

(async () => {
    const files = await fsp.readdir(apiPath);
    for (const fileName of files) {
        if (!fileName.endsWith('.js')) continue;
        const filePath = path.join(apiPath, fileName);
        const serviceName = path.basename(fileName, '.js');
        //routing[serviceName] = await load(filePath, sandbox);
    }
    staticServer('./static', 8000);
    server(routing, 8001);
})();
