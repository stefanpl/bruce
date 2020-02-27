import { expectSuccessfulExecution } from '../commandExecution/expectSuccessfulExecution';

export async function tmuxHasClient(): Promise<boolean> {
  const res = await expectSuccessfulExecution('tmux list-clients');
  return res.stdout !== '';
}
