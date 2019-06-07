import { execShellCommand } from "./commandExecution/execShellCommand";

export const EXECUTABLE_PATH_i3_MSG = '/usr/bin/i3-msg';

export async function i3Focus (direction) {
  const command = `${EXECUTABLE_PATH_i3_MSG} focus ${direction}`
  return execShellCommand(command)
}