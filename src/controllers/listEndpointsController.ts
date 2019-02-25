import { arrayOfAllEndpoints } from "../endpoints";

export default function listEndpointsController(ctx, next) {
  ctx.body = {
    availableEndpoints: arrayOfAllEndpoints,
  }
  next();
}
