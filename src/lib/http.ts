'use strict';

import http from 'node:http';
import logger from './logger'

const receiveArgs = async (req: any) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

export default (routing: Record<string, any>, port: number) => {
  http.createServer(async (req: Record<string, any>, res: Record<string, any>) => {
    const { url, socket } = req;
    const [name, method, id] = url.substring(1).split('/');
    const entity = routing[name];



    if (!entity) return res.end('Not found route');
    const handler = entity[method];
    if (!handler) return res.end('Not found method');

    // TODO method and arg from req type GET, POST
    const args: string[] = [];
    args.push(id);

    logger.log(`${socket.remoteAddress} ${method} ${url}`);
    const result = await routing[name][method](...args);
    res.end(JSON.stringify(result.rows));
  }).listen(port);

  logger.log(`HTTP API on port ${port}`);
};
