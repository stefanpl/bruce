import { execShellCommand } from "../execShellCommand";

export async function tmuxCreateSession (sessionName: string): Promise<void> {
  const result = await execShellCommand(`tmux new -s ${sessionName} -d`)
}