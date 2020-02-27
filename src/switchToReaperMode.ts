import { TmuxSession } from './tmux/tmuxCreateSession';
import { i3FocusWorkspace } from './i3FocusWorkspace';
import { spawnIndependantDetachedProcess } from './commandExecution/spawnIndependantDetachedProcess';
import { showTmuxSessionInTerminal } from './showTmuxSessionInTerminal';

const tmuxSessionIdentifier = 'midic';

const midiControllerSession: TmuxSession = {
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
      keysToBeSent: [
        'lnv',
        'Enter',
        'clear',
        'Enter',
        'npx http-server dist',
        'Enter',
      ],
    },
    {
      name: 'zsh',
      keysToBeSent: ['lnv', 'Enter', 'clear', 'Enter'],
    },
  ],
};

export async function switchToReaperMode(): Promise<void> {
  await Promise.all([
    i3FocusWorkspace(1),
    showTmuxSessionInTerminal(midiControllerSession),
    spawnIndependantDetachedProcess('reaper'),
  ]);
}
