import { i3FocusWorkspace } from "./i3FocusWorkspace";
import { tmuxSessionExists } from "./tmux/tmuxSessionExists";
import { tmuxSwitchSession } from "./tmux/tmuxSwitchSession";
import { TmuxSession, tmuxStartSession } from "./tmux/tmuxCreateSession";
import { execShellCommand } from "./commandExecution/execShellCommand";
import { tmuxHasClient } from "./tmux/tmuxHasClient";
import { i3FocusWindow } from "./i3/i3FocusWindow";
import { expectSuccessfulExecution } from "./commandExecution/expectSuccessfulExecution";
  

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
  if ( ! await tmuxSessionExists(modeIdentifier)) {
    await execShellCommand('zsh -c unb')
    await tmuxStartSession(bruceSession)
    await execShellCommand('zsh -c lnb')
  }
  await _switchOrStart()
  await i3FocusWindow(`title="${TMUX_TERMINAL_TITLE}"`)


  async function _switchOrStart () {
    if ( ! await tmuxHasClient()) {
      await expectSuccessfulExecution('terminator', [
        '--title',
        'tmux terminal',
        '--command',
        `tmux --attach-session -t ${modeIdentifier}`
      ])
    } else {
      await tmuxSwitchSession(modeIdentifier)
    }
  }
  
}