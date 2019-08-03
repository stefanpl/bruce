import { CommandSlug } from "../commands";

export default function listFunctionsController(ctx, next) {
  ctx.body = Array.from(Object.values(CommandSlug))
  next();
}
