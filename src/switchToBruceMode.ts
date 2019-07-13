import { i3FocusWorkspace } from "./i3FocusWorkspace";
import { TmuxSession } from "./tmux/tmuxCreateSession";
import promiseRetry from 'promise-retry';
import { spawnIndependantDetachedProcess } from "./commandExecution/spawnIndependantDetachedProcess";
import { commands, runCommand } from "./commands";
import { tmuxActivateSession } from "./tmux/tmuxActivateSession";
import { tmuxWaitForClient } from "./tmux/tmuxWaitForClient";
import { focusOrStartTmuxTerminal } from "./functionAliases";


export const TMUX_TERMINAL_TITLE = 'tmux terminal'

const modeIdentifier = 'bruce'
const workingDir = '/home/stefan/webdev/bruce'

export const bruceSession: TmuxSession = {
  defaultCommand: 'zsh',
  defaultWorkingDir: workingDir,
  name: modeIdentifier,
  windows: [
    {
      name: 'watcher',
      keysToBeSent: ['lnv', 'Enter', 'clear', 'Enter', 'nrw', 'Enter'],
    },
    {
      name: 'restart pm2',
      keysToBeSent: ['lnv', 'Enter', 'clear', 'Enter', 'npm run restart-server-on-change', 'Enter'],
    },
    {
      name: 'zsh',
      keysToBeSent: ['lnv', 'Enter', 'clear', 'Enter'],
    },
  ]
}


export async function switchToBruceMode (): Promise<void> {
  await i3FocusWorkspace(1)
  await focusOrStartTmuxTerminal()
  await spawnIndependantDetachedProcess('zsh -c brcv')
  await tmuxWaitForClient()
  await tmuxActivateSession(bruceSession)
}