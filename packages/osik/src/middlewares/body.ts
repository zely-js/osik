import { Middleware } from '$osik/types';

/*

url: /helloworld
body: { "Hello": "world" }

req.body = { "Hello": "world" }

*/

const MiddlewareBody: Middleware = (req, res, next) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    if (body === '') {
      body = '{}';
    }

    req.body = JSON.parse(body);
  });

  next();
};

export { MiddlewareBody };
