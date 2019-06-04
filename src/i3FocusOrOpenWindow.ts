import * as cp from 'child_process';
import { EXECUTABLE_PATH_i3_MSG } from './i3Functions';
import { execShellCommand, ExecutionResult } from './commandExecution/execShellCommand';
import { i3MsgExecutionSuccessful } from './i3/i3MsgExecutionSuccessful';
import { i3FocusWindow } from './i3/i3FocusWindow';
import { spawnIndependantDetachedProcess } from './commandExecution/spawnIndependantDetachedProcess';
import * as assert from 'assert';




export async function i3FocusOrOpenWindow (windowMatchingExpression, commandToOpen): Promise<void> {
  if ( ! await i3FocusWindow(windowMatchingExpression)) {
    await spawnIndependantDetachedProcess(commandToOpen)
  }
  try {
    await _recursivelyTryToFocusWindow()
  } catch (error) {
    console.error(error);
  }
  
  function _recursivelyTryToFocusWindow(): Promise<void> {
    const pauseBetweenRetries = 100
    const maxAttempts = 20
    let attemptsMade = 0
    return new Promise(async function _tryToFocusWindow(resolve, reject) {
      const focusAttained = await i3FocusWindow(windowMatchingExpression)
      if ( ! focusAttained ) {
        if (attemptsMade++ > maxAttempts) {
          reject(Error(`i3 could not focus '${windowMatchingExpression}'`)
          + ` within ${maxAttempts * pauseBetweenRetries} ms after executing ${commandToOpen}`);
        } else {
          setTimeout(() => _tryToFocusWindow(resolve, reject), pauseBetweenRetries)
        }
      } else {
        resolve()
      }
    });
  }
}