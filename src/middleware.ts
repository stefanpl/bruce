/**
* This middleware is put on top of the middleware stack and can be used for one-off debugging purposes.
*/
async function debugRequest(ctx, next) {
  // Put your debugging needs here
  // …
  await next();
}


export default {
  debugRequest,
}