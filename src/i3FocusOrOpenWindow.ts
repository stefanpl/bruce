import * as cp from 'child_process';
import { EXECUTABLE_PATH_i3_MSG } from './i3Functions';
import { execShellCommand, ExecutionResult } from './commandExecution/execShellCommand';
import { i3MsgExecutionSuccessful } from './i3/i3MsgExecutionSuccessful';
import { i3FocusWindow } from './i3/i3FocusWindow';
import { spawnIndependantDetachedProcess } from './commandExecution/spawnIndependantDetachedProcess';




export async function i3FocusOrOpenWindow (windowMatchingExpression, commandToOpen): Promise<void> {
  if ( ! await i3FocusWindow(windowMatchingExpression)) {
    await spawnIndependantDetachedProcess(commandToOpen)
  }
  // Now, the program should be running and soon become focusable
  // TODO: use while loop instead of one-time timeout
  setTimeout(() => i3FocusWindow(windowMatchingExpression), 500)
}