import allRoutes from './routes';
import middleware from "./middleware";
import {Route} from "./interfaces/route";

const Router = require('koa-router-joi');
// [https://www.npmjs.com/package/koa-router-joi](koa-router-joi) supports creating multiple router instances.
// For now, we only operate on one default router until more granulation (e.g. /admin vs /public) is needed.
const defaultRouter = Router();


(function setupRoutes () {
  allRoutes.forEach(function assignRouteToRouter(route) {
    defaultRouter.route({
      method: route.methods,
      path: route.path,
      validate: createValidationObjectForRoute(route),
      handler: route.middleware,
    });
  });
})();


function createValidationObjectForRoute(route: Route) {
  return route.checkedInput ? {
    body: route.checkedInput,
    type: 'json',
    continueOnError: false,
  } : {};
}

defaultRouter
  .use(middleware.debugRequest)


export default defaultRouter;