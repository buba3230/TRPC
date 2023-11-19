var express = require("express");
const port = 3000;
// const createExpressMiddleware = require('@trpc/server/adapters/express');
import { createExpressMiddleware } from '@trpc/server/adapters/express'
// const appRouter = require('./router/index');
import { appRouter } from './router';
var cors = require('cors');
var bodyParser = require('body-parser');

//JSON-SERVER START
var jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("hero.json");
const middlewares = jsonServer.defaults({ noCors: true });
server.use(middlewares);
server.use(router);
//JSON-SERVER END

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
// server.use('/', router);
app.use('/trpc', createExpressMiddleware({
  router: appRouter
}))



server.listen(3000, () => {
  console.log("JSON Server is running! Port 3000");
});

app.listen(8800, () => {
  console.log("Express is running!!! Port 8800");
  console.log("Backend complete, is running...");
});
