import { execShellCommand } from "./commandExecution/execShellCommand";
import { i3MsgExecutionSuccessful } from "./i3/i3MsgExecutionSuccessful";

export const i3MsgBinary = '/usr/bin/i3-msg';

export async function i3FocusWorkspace (workspaceIdentifier: string | number): Promise<void> {
    
    const command = `${i3MsgBinary} workspace ${workspaceIdentifier}`;
    const result = await execShellCommand(command);
    if ( ! i3MsgExecutionSuccessful(result)) {
      throw Error(`Invalid i3 result. Put this check into its own function!`);
    }
}