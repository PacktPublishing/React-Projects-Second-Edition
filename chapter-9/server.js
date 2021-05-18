const JsonWebToken = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const user = {
  username: 'test',
  password: '$2b$10$5dwsS5snIRlKu8ka5r7z0eoRyQVAsOtAZHkPJuSx.agOWjchXhSum',
};

const jwtSecret = '34%%##@#FGFKFL';

server.post('/api/login', async (req, res) => {
  if (user.username === req.query.username) {
    Bcrypt.compare(req.query.password, user.password, (error, result) => {
      if (!error && result) {
        res.jsonp({
          username: user.username,
          token: JsonWebToken.sign({ user: user.username }, jwtSecret, {
            expiresIn: 3600,
          }),
        });
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    const token = req.headers.authorization;
    const bearerToken = token && token.split(' ');

    if (bearerToken) {
      JsonWebToken.verify(bearerToken[1], jwtSecret, (error) => {
        if (!error) {
          next();
        } else {
          res.sendStatus(401);
        }
      });
    } else {
      res.sendStatus(401);
    }
  } else {
    next();
  }
});
server.use('/api', router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
