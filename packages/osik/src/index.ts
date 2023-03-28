import { ServerConstructorOptions } from '$core/types';

import { OsikServer } from './server';

function osik(options?: ServerConstructorOptions) {
  return new OsikServer(options);
}

export { osik, OsikServer };

export * from './middlewares';
