import { ExecutionResult } from "../commandExecution/execShellCommand";

export function i3MsgExecutionSuccessful(i3result: ExecutionResult): boolean {
  if (i3result.stderr && i3result.stdout.match(/error/)) return false
  if (i3result.stderr === '' && ! i3result.stdout.match(/error/)) return true
  if (i3result.stdout.match(/success.{1,5}false/)) return false
  throw Error(`Could not determine weather i3result was successful or not. `
  + `Result: ${JSON.stringify(i3result)}`);
}