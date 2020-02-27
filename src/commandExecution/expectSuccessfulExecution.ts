import * as assert from 'assert';
import { execShellCommand, ExecutionResult } from './execShellCommand';

export async function expectSuccessfulExecution(
  commandAndArgs: string,
  args: Array<string> = []
): Promise<ExecutionResult> {
  const executionResult = await execShellCommand(commandAndArgs, args);
  assert.strictEqual(
    executionResult.exitCode,
    0,
    `Command '${commandAndArgs}' was expected to succeed, but exit ` +
      `code was ${executionResult.exitCode}. Stderr: ${executionResult.stderr}`
  );
  return executionResult;
}
