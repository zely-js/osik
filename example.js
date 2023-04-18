const m = require('./packages/osik/dist');
const static = require('./packages/static/dist');
const { Router } = require('./packages/router/dist');

const app = m.osik({ useApi: true });

const router = new Router();
const usersRouter = new Router('/user');
// router

router.get('/hello', (req, res) => {
  console.log(req.body);
  res.send('Hello World!');
});

usersRouter.get('/:user', (req, res) => {
  res.send(`Hello ${req.params.user}`);
});

app.use(router.routes());
app.use(usersRouter.routes());

// static

app.use(static.Static('./packages'));

// middleware

app.use(async (req, res, next) => {
  await next();
  console.log('2!');
});

app.use(async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  console.log('1');
  res.end('hello');
});

app.listen(4000, () => {
  console.log('http://localhost:4000');
});
