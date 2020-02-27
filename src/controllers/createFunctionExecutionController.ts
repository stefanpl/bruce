import { commands, runCommand } from '../commands';

type FunctionIdentifier = number | string;

export default async function createFunctionExecutionController(ctx, next) {
  const { functionIdentifier } = ctx.params;
  if (!functionIdentifier) {
    throw Error('Missing URL param: functionIdentifier');
  }
  const commandOrCallback = commands[functionIdentifier];
  if (!commandOrCallback) {
    throw Error(
      `Unknown function identifier '${ctx.params.functionIdentifier}'`
    );
  }
  const passedArguments = ctx.request.body.arguments
    ? ctx.request.body.arguments
    : [];
  runCommand(commandOrCallback, passedArguments);
  ctx.status = 200;
  return next();
}
