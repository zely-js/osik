import { IncomingMessage, Server, ServerResponse } from 'http';

import { Middleware, ServerConstructorOptions, ServerOptions } from '$osik';

import { defaultServer } from './default';

import {
  MiddlewareBody,
  MiddlewarePreventFavicon,
  MiddlewareQueryString,
  MiddlewareResponse,
} from '../middlewares';

export class OsikServer {
  options: ServerOptions;

  middlewares: Middleware[];

  server: Server;

  constructor(options?: ServerConstructorOptions) {
    this.options = {
      // default http server
      server: defaultServer(),
      useApi: true,

      ...options,
    };

    this.middlewares = [];

    this.use(MiddlewareBody, MiddlewareQueryString, MiddlewareResponse);

    if (!this.options.requestFavicon) {
      this.use(MiddlewarePreventFavicon);
    }

    this.server = this.options.server.createServer((req, res) => {
      this.handle(req, res);
    });
  }

  use(...middlewares: Middleware[]) {
    middlewares.forEach((middleware) => {
      // check is function
      if (typeof middleware !== 'function') {
        // console.error('middleware must be function.');
      } else {
        this.middlewares.push(middleware);
      }
    });

    return this;
  }

  async handle(req: IncomingMessage, res: ServerResponse) {
    if (this.middlewares.length === 0) return;

    let index = -1;

    const loop = async () => {
      if (index < this.middlewares.length && !res.writableEnded) {
        const middleware = this.middlewares[(index += 1)];

        if (middleware) {
          (res as any).body = null;

          await middleware(req as any, res as any, loop);

          /*
          res.body = "hello";
          res.body = { "hello": "world" };
          */
        }
      }
    };

    loop().then(() => {
      if (this.options.useApi) {
        if (res.writableEnded) {
          // console.error('res.body is ignored because the data has already been sent.');
        }

        const { body } = res as any;

        if (body) {
          if (typeof body === 'object') {
            res.setHeader('Content-Type', 'text/json');
            res.end(JSON.stringify(body));
          } else {
            res.end(body);
          }
        }
      }
    });
  }

  listen(port: number, callback?: () => void | Promise<void>) {
    this.server.listen(port, callback);

    return this;
  }
}
