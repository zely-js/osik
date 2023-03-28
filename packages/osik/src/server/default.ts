import { createServer } from 'http';

import { CustomServer } from '$core/types';

export function defaultServer(): CustomServer {
  return {
    createServer,
  };
}
