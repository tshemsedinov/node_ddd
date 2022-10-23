'use strict';

import http from 'node:http';
import logger from './logger';

const HEADERS = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=UTF-8',
};

const receiveArgs = async (req: any) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return data ? JSON.parse(data) : null;
};

export default (routing: Record<string, any>, port: number) => {
  http.createServer(async (req: Record<string, any>, res: Record<string, any>) => {
    res.writeHead(200, HEADERS);
    if (req.method !== 'POST') return res.end('"Only POST allowed"');
    const { url, socket } = req;
    const [place, name, method, id] = url.substring(1).split('/');

    if (place !== 'api') return res.end('"Not found place"');
    if (!name || !routing[name]) return res.end('Not found route');
    if (!method || !routing[name][method]) return res.end('Not found method');

    const args: string[] = [];
    if (id) args.push(id);
    const data = await receiveArgs(req);
    if (data) args.push(data);

    logger.log(`${req.method} ${socket.remoteAddress} ${method} ${url}`);
    logger.log(args);

    const result = await routing[name][method](...args);
    res.end(JSON.stringify(result.rows));
  }).listen(port);

  logger.log(`HTTP API on port ${port}`);
};
