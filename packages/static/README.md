# @osik/router

> static middleware

```ts
const { osik } = require('osik');
const { Static } = require('@osik/static');

const app = osik();

app.use(Static('/public'));

app.listen(3000);
```

## License

MIT
