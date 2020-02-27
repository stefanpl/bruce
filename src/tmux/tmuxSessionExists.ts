import { execShellCommand } from '../commandExecution/execShellCommand';

export async function tmuxSessionExists(sessionName: string): Promise<boolean> {
  const result = await execShellCommand(`tmux has-session -t ${sessionName}`);
  return result.exitCode === 0;
}
