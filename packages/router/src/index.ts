import urljoin from 'url-join';
import { parse } from 'url';
import { pathToRegexp } from '@osik/path-regexp';

import { Request, Response } from '$osik';
import { RoutesHandler } from '$router';

// eslint-disable-next-line no-unused-vars

class Router {
  private __routes: Array<{ method: string; path: string; fn: any }>;

  private prefix: string;

  constructor(prefix?: string) {
    this.__routes = [];
    this.prefix = prefix || '/';
  }

  // handlers

  get(path: string, handler: RoutesHandler) {
    this.__routes.push({
      method: 'get',
      path,
      fn: handler,
    });
  }

  post(path: string, handler: RoutesHandler) {
    this.__routes.push({
      method: 'post',
      path,
      fn: handler,
    });
  }

  all(path: string, handler: RoutesHandler) {
    this.__routes.push({
      method: 'all',
      path,
      fn: handler,
    });
  }

  del(path: string, handler: RoutesHandler) {
    this.__routes.push({
      method: 'delete',
      path,
      fn: handler,
    });
  }

  put(path: string, handler: RoutesHandler) {
    this.__routes.push({
      method: 'put',
      path,
      fn: handler,
    });
  }

  // handling

  routes() {
    return (req: Request, res: Response, next: any) => {
      const METHOD = req.method.toLocaleLowerCase();

      let sent = false;

      this.__routes.forEach((route) => {
        const currentMethod = route.method.toLocaleLowerCase();

        if ((METHOD === currentMethod || currentMethod === 'all') && !sent) {
          const path = pathToRegexp(urljoin(this.prefix, route.path), false);

          if (path.pattern.test(parse(req.url).pathname)) {
            // finish

            sent = true;

            const execd = new URL(req.url, `http://${req.headers.host}`).pathname.match(
              path.pattern
            );

            req.params = {};

            path.params.forEach((param, index) => {
              req.params[param] = execd[index + 1] || null;
            });

            route.fn(req, res);
          }
        }
      });

      if (!sent) next();
    };
  }
}

export { Router };
