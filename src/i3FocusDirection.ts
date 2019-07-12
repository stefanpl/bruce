import { execShellCommand } from "./commandExecution/execShellCommand"

export const EXECUTABLE_PATH_i3_MSG = '/usr/bin/i3-msg'

type i3Direction = 'left' | 'right' | 'up' | 'down'

export async function i3FocusDirection (direction: i3Direction) {
  const command = `${EXECUTABLE_PATH_i3_MSG} focus ${direction}`
  return execShellCommand(command)
}