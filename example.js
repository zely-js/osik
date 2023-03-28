const m = require('./packages/osik/dist');

const app = m.osik();

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

app.listen(3000);
