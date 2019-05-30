import { execShellCommand, i3ResultIsSuccessful } from "./i3FocusOrOpenWindow";

export async function i3FocusWorkspace (workspaceIdentifier: string | number): Promise<void> {
    const i3msg = '/usr/bin/i3-msg';
    const command = `${i3msg} workspace ${workspaceIdentifier}`;
    const result = await execShellCommand(command);
    if ( ! i3ResultIsSuccessful(result)) {
      console.error(`Could not open workspace ${workspaceIdentifier}`);
    }
}