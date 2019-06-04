import { i3FocusWorkspace } from "./i3FocusWorkspace";
import { tmuxSessionExists } from "./tmux/tmuxSessionExists";
import { tmuxSwitchSession } from "./tmux/tmuxSwitchSession";
import { TmuxSession, tmuxStartSession } from "./tmux/tmuxCreateSession";
import { execShellCommand } from "./commandExecution/execShellCommand";
import { tmuxHasClient } from "./tmux/tmuxHasClient";
import { i3FocusWindow } from "./i3/i3FocusWindow";
import { expectSuccessfulExecution } from "./commandExecution/expectSuccessfulExecution";
import { spawnIndependantDetachedProcess } from "./commandExecution/spawnIndependantDetachedProcess";
import { commands, runCommand } from "./commands";
import { tmuxActivateSession } from "./tmux/tmuxActivateSession";
  

export const TMUX_TERMINAL_TITLE = 'tmux terminal'

const modeIdentifier = 'bruce'
const workingDir = '/home/stefan/webdev/bruce'

const bruceSession: TmuxSession = {
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
  await tmuxActivateSession(bruceSession)
  await runCommand(commands["show-tmux-terminal"])
  await spawnIndependantDetachedProcess('zsh -c "brcv"')

  
}