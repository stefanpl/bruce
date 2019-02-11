const Koa = require('koa');
const app = new Koa();
import defaultRouter from './router';
require('dotenv-safe').config();
const httpPortDefault = process.env.HTTP_PORT;
import {runShutdownRoutines, runStartupRoutines} from "./serverLifetimeRoutines";

let httpServer;

/**
 * Start the token server.
 * @param {number} httpPort – server will try to listen on this port
 */
async function start(httpPort = httpPortDefault) {
  app.use(defaultRouter.middleware());
  await runStartupRoutines();
  httpServer = await app.listen(httpPort);
}

async function close() {
  if ( ! httpServer) {
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