import * as cp from 'child_process';
import { i3FocusOrOpenWindow } from '../i3FocusOrOpenWindow';

type FunctionIdentifier = number | string;

const functionIdentifiersToCallbacks: Record<FunctionIdentifier, (requestBody) => void> = {
  1: function (requestBody) {
    const workspace = parseInt(requestBody.workspace);
    if (workspace === undefined || isNaN(workspace)) {
      throw Error(`Illegal workspace passed: '${requestBody.workspace}'`);
    }
    try {
      cp.execSync(`i3-msg workspace ${workspace}`);
    } catch (err) {
      console.error(err.message);
    }
  },
  'i3-focus-or-open-window': function (requestBody) {
    i3FocusOrOpenWindow.apply(null, requestBody.arguments);
  }
}

export default function createFunctionExecutionController(ctx, next) {
  if ( ! ctx.params.functionIdentifier ) {
    throw Error(`Missing URL param: functionIdentifier`);
  }
  const callback = functionIdentifiersToCallbacks[ctx.params.functionIdentifier];
  if ( ! callback) {
    throw Error(`Unknown function identifier '${ctx.params.functionIdentifier}'`);
  }
  callback(ctx.request.body);
  ctx.status = 200;
  return next();
}
