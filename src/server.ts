const Koa = require('koa');
const app = new Koa();
import defaultRouter from './router';
require('dotenv-safe').config();
const httpPortDefault = process.env.NODE_HTTP_PORT;
import { runShutdownRoutines, runStartupRoutines } from "./serverLifetimeRoutines";
var cors = require('koa-cors');
var route = require('koa-route');

let httpServer;

/**
 * Start the token server.
 * @param {number} httpPort – server will try to listen on this port
 */
async function start(httpPort = httpPortDefault) {
  app.use(cors({
    origin: '*'
  }));
  app.use(defaultRouter.middleware());
  await runStartupRoutines();
  httpServer = await app.listen(httpPort);
  app.httpPort = httpPort;
  console.log('bruce server has started on port ' + httpPort);
  return;
}

async function close() {
  if (!httpServer) {
    throw new Error('The server has not been started yet.');
  }
  await httpServer.close();
  await runShutdownRoutines();
}

export default {
  app,
  defaultRouter,
  start,
  close,
  stop: close,
}