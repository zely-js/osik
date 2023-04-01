# @osik/router

> express-style Router middleware

```ts
const { osik } = require('osik');
const { Router } = require('@osik/router');

const app = osik();
const router = new Router();

router.get('/', (req, res) => {
  res.body = 'Hello World';
});

app.use(router.routes());

app.listen(3000);
```

## License

MIT
