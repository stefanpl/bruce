export default function listFunctionsController(ctx, next) {
  ctx.body = {
    availableFunctions: [{
      name: 'Start project VS code',
      slug: 'start-in-vs-code',
    }],
  }
  next();
}
