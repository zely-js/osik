import 'osik';
import { Middleware, Request, Response } from 'osik';

declare module 'osik' {
  export interface Request {
    params: any;
  }
}

export type RoutesHandler = (req: Request, res: Response) => void;

export class Router {
  constructor(prefix?: string);

  // handlers

  get(path: string, handler: RoutesHandler): void;

  post(path: string, handler: RoutesHandler): void;

  all(path: string, handler: RoutesHandler): void;

  del(path: string, handler: RoutesHandler): void;

  put(path: string, handler: RoutesHandler): void;

  // handling

  routes(): Middleware;

  __routes: Array<{ method: string; path: string; fn: any }>;

  prefix: string;
}
