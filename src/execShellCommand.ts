import * as cp from 'child_process';

interface ExecutionResult {
  exitCode: number,
  stdout: string,
  stderr: string,
}

export async function execShellCommand(commandAndArgs: string, args: Array<string> = []): Promise<ExecutionResult> {
  const commandSplitBySpace = commandAndArgs.split(' ')
  const commandToLaunch = commandSplitBySpace.splice(0, 1)[0]
  const allArgs: Array<string> = commandSplitBySpace.concat(args)
  const process = cp.spawn(commandToLaunch, allArgs, {})
  const result: ExecutionResult = {
    exitCode: -1,
    stderr: '',
    stdout: '',
  };
  ['stderr', 'stdout'].forEach(channel => {
    process[channel].on('data', data => {
      result[channel] += data
    })
  })
  return new Promise((resolve, reject) => {
    process.on('exit', code => {
      result.exitCode = code ? code : 0
      resolve(result)
    })
    process.on('error', err => reject(err))
  })
}