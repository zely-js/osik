# @osik/path-regexp

convert path to regexp

```ts
import { pathToRegexp } from '@osik/path-regexp';

pathToRegexp('/'); // { params: [], pattern: /^\/\/?$/i }
pathToRegexp('/hello'); // { params: [], pattern: /^\/hello\/?$/i }
pathToRegexp('/user/:user'); // { params: [ 'user' ], pattern: /^\/([^/]+?)\/?$/i }
```

## License

MIT
