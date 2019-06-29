import { TmuxSession } from "./tmux/tmuxCreateSession";
import { startTmuxTerminal } from "./functionAliases";
import { tmuxWaitForClient } from "./tmux/tmuxWaitForClient";
import { tmuxActivateSession } from "./tmux/tmuxActivateSession";

export async function showTmuxSessionInTerminal (session: TmuxSession) {
  await startTmuxTerminal()
  await tmuxWaitForClient()
  await tmuxActivateSession(session)
}