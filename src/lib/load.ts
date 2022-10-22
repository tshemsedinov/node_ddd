'use strict';

import { promises as fsp } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import logger from './logger';
import config from '../config'

export class Load {
  public static async loadApiRoutes(sandbox: Object, pathParam: string, libParam: string) {
    const result: Record<string, any> = {};
    for (const fileName of (await fsp.readdir(path.join(__dirname, pathParam)))) {
      if (!fileName.endsWith('.ts') || fileName.endsWith('base.ts')) continue;
      const apiName = path.basename(fileName, '.ts');
      result[apiName] = vm.runInContext('new Api(db, common);',
        vm.createContext(Object.freeze({
          ...sandbox,
          Api: (await import(pathParam + apiName))['default']
        })), { ...config.sandbox });
      logger.log('Load API: ' + apiName);
    }
    return result;
  }
}
