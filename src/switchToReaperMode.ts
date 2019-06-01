import { TmuxSession, tmuxStartSession } from "./tmux/tmuxCreateSession";
import { i3FocusWorkspace } from "./i3FocusWorkspace";
import { tmuxSessionExists } from "./tmux/tmuxSessionExists";
import { execShellCommand } from "./commandExecution/execShellCommand";
import { i3FocusWindow } from "./i3/i3FocusWindow";
import { tmuxHasClient } from "./tmux/tmuxHasClient";
import { expectSuccessfulExecution } from "./commandExecution/expectSuccessfulExecution";
import { tmuxSwitchSession } from "./tmux/tmuxSwitchSession";
import { TMUX_TERMINAL_TITLE } from "./switchToBruceMode";
import { i3FocusOrOpenWindow } from "./i3FocusOrOpenWindow";
import { EXECUTABLE_PATH_i3_MSG } from "./i3Functions";


const tmuxSessionIdentifier = 'reaper baus'
const i3WorkspaceName = 'Schall und Rauch'

const reaperBausSessions: TmuxSession = {
  defaultCommand: 'zsh',
  defaultWorkingDir: '/home/stefan/webdev/midi-controller',
  name: tmuxSessionIdentifier,
  windows: [
    {
      name: 'watcher',
      keysToBeSent: ['lnv', 'Enter', 'clear', 'Enter', 'nrw', 'Enter'],
    },
    {
      name: 'http server',
      keysToBeSent: ['lnv', 'Enter', 'clear', 'Enter', 'npx http-server dist', 'Enter'],
    },
    {
      name: 'zsh',
      keysToBeSent: ['lnv', 'Enter', 'clear', 'Enter'],
    },
  ]
}


export async function switchToReaperMode (): Promise<void> {
  
  await i3FocusWorkspace(i3WorkspaceName)
  if ( ! await tmuxSessionExists(tmuxSessionIdentifier)) {
    await execShellCommand('zsh -c unb')
    await tmuxStartSession(reaperBausSessions)
    await execShellCommand('zsh -c lnb')
  }
  await _switchOrStart()
  await i3FocusOrOpenWindow(`class="REAPER"`, 'reaper')
  await execShellCommand(EXECUTABLE_PATH_i3_MSG, [
    `[title="${TMUX_TERMINAL_TITLE}"]`,
    'move container to workspace',
    i3WorkspaceName,
  ])

  async function _switchOrStart () {
    if ( ! await tmuxHasClient()) {
      await expectSuccessfulExecution('terminator', [
        '--title',
        'tmux terminal',
        '--command',
        `tmux --attach-session -t ${tmuxSessionIdentifier}`
      ])
    } else {
      await tmuxSwitchSession(tmuxSessionIdentifier)
    }
  }
  
}