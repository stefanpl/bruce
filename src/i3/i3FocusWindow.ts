import { execShellCommand } from '../commandExecution/execShellCommand';
import { EXECUTABLE_PATH_i3_MSG } from '../i3FocusDirection';
import { i3MsgExecutionSuccessful } from './i3MsgExecutionSuccessful';

export async function i3FocusWindow(
  windowMatchingExpression
): Promise<boolean> {
  const result = await execShellCommand(EXECUTABLE_PATH_i3_MSG, [
    `[${windowMatchingExpression}]`,
    'focus',
  ]);
  return i3MsgExecutionSuccessful(result);
}
