import { createServer } from 'http';

import { CustomServer } from '$osik';

export function defaultServer(): CustomServer {
  return {
    createServer,
  };
}
