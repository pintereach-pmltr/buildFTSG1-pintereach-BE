const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureMiddleware = require('./middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js.js.js');
const boardsRouter = require('../boards/boards-router.js.js.js');
const articlesRouter = require('../articles/articles-router.js.js.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
configureMiddleware(server);

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/boards', boardsRouter);
server.use('/api/articles', articlesRouter);

server.get('/', (req, res) => {
  res.send({message: "It's alive!"});
});

module.exports = server;
