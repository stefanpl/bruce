export default function listEndpointsController(ctx, next) {
  ctx.body = {
    availableEndpoints: [{
      name: 'get-endpoints',
      woof: 'change me'
    }],
  }
  next();
}
