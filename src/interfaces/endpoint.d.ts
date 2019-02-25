import * as Router from "koa-router";

interface Endpoint extends ChattyEntity {
  identifier: number,
  path: string,
  methods: httpMethod | Array<httpMethod>,
  middleware: Array<Router.IMiddleware> | Router.IMiddleware,
  checkedInput?: any,
}