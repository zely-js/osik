import type { createServer, IncomingMessage, Server, ServerResponse } from 'http';

export interface Request extends IncomingMessage {
  body: any;
  querystring: string;
  query: any;
  search: string;
}

export interface Response extends ServerResponse {
  json: (data: any) => Response;
  send: (data: any) => Response;
  status: (code: number) => Response;

  body: string;
}

export interface CustomServer {
  createServer?: typeof createServer;
}

export type ServerNext = () => void;

export type Middleware = (
  req: Request,
  res: Response,
  next: ServerNext
) => void | Promise<void>;

export interface ServerOptions {
  server?: CustomServer;
  middlewares?: Middleware[];
  useApi?: boolean;
  requestFavicon?: boolean;
}

export interface ServerConstructorOptions extends ServerOptions {}

export interface OsikServer {
  options: ServerOptions;

  middlewares: Middleware[];

  server: Server;

  constructor(options?: ServerConstructorOptions);

  use(...middlewares: Middleware[]): this;

  listen(port: number, callback?: () => void | Promise<void>): this;

  handle(req: IncomingMessage, res: ServerResponse): void;
}

export function osik(options?: ServerConstructorOptions): OsikServer;
