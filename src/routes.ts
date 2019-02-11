// @ts-ignore
import { Route } from "./interfaces/route";

const JoiValidator = require('koa-router-joi').Joi;

function listEndpoints(ctx, next) {
  ctx.body = {
    availableEndpoints: [{
      name: 'get-endpoints',
      woof: 'change me'
    }],
  }
  next();
}

const listOfAllRoutes: Array<Route> = [
  {
    name: 'get-endpoints',
    methods: 'get',
    path: '/endpoints',
    middleware: listEndpoints,
  },
];


let routeMap: Map<string, Route> = new Map();

(function transformListToMap() {
  listOfAllRoutes.forEach(function assignRouteToMap(route) {
    routeMap.set(route.name, route);
  });
})();

export default routeMap;