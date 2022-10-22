'use strict';

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
import logger from './logger';

export default (root: string, port: number) => {
  http.createServer(async (req: Record<string, any>, res: Record<string, any>) => {
    const url = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(root, url);
    try {
      const data = await fs.promises.readFile(filePath);
      res.end(data);
    } catch (err) {
      res.statusCode = 404;
      res.end('"File is not found"');
    }
  }).listen(port);

  logger.log(`Static on port ${port}`);
};
