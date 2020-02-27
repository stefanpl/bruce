import { TmuxSession } from './tmux/tmuxCreateSession';
import { focusOrStartTmuxTerminal } from './functionAliases';
import { tmuxWaitForClient } from './tmux/tmuxWaitForClient';
import { tmuxActivateSession } from './tmux/tmuxActivateSession';

export async function showTmuxSessionInTerminal(session: TmuxSession) {
  await focusOrStartTmuxTerminal();
  await tmuxWaitForClient();
  await tmuxActivateSession(session);
}
