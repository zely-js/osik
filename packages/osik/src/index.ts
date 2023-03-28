import { ServerConstructorOptions } from '$osik/types';

import { OsikServer } from './server';

function osik(options?: ServerConstructorOptions) {
  return new OsikServer(options);
}

export { osik, OsikServer };

export * from './middlewares';
