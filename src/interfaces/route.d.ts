import * as Router from "koa-router";

interface Route {
  name: string,
  path: string,
  methods: httpMethod | Array<httpMethod>,
  middleware: Array<Router.IMiddleware> | Router.IMiddleware,
  checkedInput?: any,
}