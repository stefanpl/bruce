import middleware from './middleware';
import { IEndpoint } from './interfaces/endpoint';
import { mapOfAllEndpoints } from './endpoints';

const Router = require('koa-router-joi');
// [https://www.npmjs.com/package/koa-router-joi](koa-router-joi) supports creating multiple router instances.
// For now, we only operate on one default router until more granulation (e.g. /admin vs /public) is needed.
const defaultRouter = Router();

(function setupEndpoints() {
  mapOfAllEndpoints.forEach(function assignEndpointToRouter(endpoint) {
    defaultRouter.route({
      method: endpoint.methods,
      path: endpoint.path,
      validate: createValidationObjectForEndpoint(endpoint),
      handler: endpoint.middleware,
    });
  });
})();

function createValidationObjectForEndpoint(endpoint: IEndpoint) {
  return endpoint.checkedInput
    ? {
      body: endpoint.checkedInput,
      type: 'json',
      continueOnError: false,
    }
    : {};
}

defaultRouter.use(middleware.debugRequest);

export default defaultRouter;
