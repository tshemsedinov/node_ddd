import { promises as fsp } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import logger from './logger';
import config from '../config'

export async loadApiRoutes(sandbox: Object, pathParam: string, libParam: string) {
  const result: Record<string, any> = {};
  const files = await fsp.readdir(path.join(__dirname, pathParam));
  for (const fileName of files) {
    if (!fileName.endsWith('.ts') || fileName.endsWith('base.ts')) continue;
    const apiName = path.basename(fileName, '.ts');
    const Api = await import(pathParam + apiName)).default;
    const context = Object.freeze({ ...sandbox, Api });
    vm.createContext(context, { ...config.sandbox });
    result[apiName] = vm.runInContext('new Api(db, common);', context);
    logger.log('Load API: ' + apiName);
  }
  return result;
}
