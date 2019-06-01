import { expectSuccessfulExecution } from "../commandExecution/expectSuccessfulExecution";

export async function tmuxSwitchSession (sessionName: string): Promise<void> {
  await expectSuccessfulExecution(`tmux switch-client -t`, [sessionName])
}