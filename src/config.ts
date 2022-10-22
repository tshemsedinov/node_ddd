'use strict';

export default {
  static: {
    port: 8000,
  },
  api: {
    port: 8001,
    transport: 'http',
  },
  sandbox: {
    timeout: 5000,
    displayErrors: true,
  },
  db: {
    host: '127.0.0.1',
    port: 5432,
    database: 'node_chat',
    user: 'marcus',
    password: 'marcus',
  },
  logger: {
    path: './logs'
  }
};