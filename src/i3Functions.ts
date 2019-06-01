import { execShellCommand } from "./commandExecution/execShellCommand";
import * as i3wm from 'i3wm';

export const EXECUTABLE_PATH_i3_MSG = '/usr/bin/i3-msg';

export async function i3Focus (direction) {
  const command = `${EXECUTABLE_PATH_i3_MSG} focus ${direction}`
  return execShellCommand(command)
}

interface i3Tree {

}


// const client = await i3wm.Client.connect()
// i3wm.Client.disconnect(client)

export async function i3GetTree (): Promise<i3Tree> {
  // return JSON.parse(await execShellCommand('i3-msg -t get_tree'))
  return {}
}