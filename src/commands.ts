import { i3FocusOrOpenWindow } from './i3FocusOrOpenWindow';
import { execShellCommand } from './commandExecution/execShellCommand';
import { i3FocusDirection } from './i3FocusDirection';
import { switchToBruceMode } from './switchToBruceMode';
import { switchToReaperMode } from './switchToReaperMode';
import { i3FocusWorkspace } from './i3FocusWorkspace';
import { focusOrStartTmuxTerminal } from './functionAliases';

type Command = string | Function;

export enum CommandSlug {
  MEDIA_NEXT = 'media-next',
  MEDIA_PAUSE = 'media-pause',
  PRESS_CTRL_R = 'press-ctrl-r',
  PRESS_ESCAPE = 'press-escape',
  FOCUS_SPOTIFY = 'focus-spotify',
  CHANGE_i3_WORKSPACE = 'change-i3-workspace',
  MODE_BRUCE = 'mode-bruce',
  MODE_REAPER = 'mode-reaper',
  SHOW_TMUX_TERMINAL = 'show-tmux-terminal',
}

export const commands: Record<CommandSlug, Command> = {
  [CommandSlug.MEDIA_NEXT]: 'playerctl next',
  [CommandSlug.MEDIA_PAUSE]: 'playerctl pause',
  [CommandSlug.PRESS_CTRL_R]: 'xdotool key ctrl+r',
  [CommandSlug.PRESS_ESCAPE]: 'xdotool key Escape',
  [CommandSlug.MODE_REAPER]: switchToReaperMode,
  [CommandSlug.FOCUS_SPOTIFY]: () =>
    i3FocusOrOpenWindow('class="Spotify"', 'spotify'),
  [CommandSlug.CHANGE_i3_WORKSPACE]: i3FocusWorkspace,
  [CommandSlug.MODE_BRUCE]: switchToBruceMode,
  [CommandSlug.SHOW_TMUX_TERMINAL]: focusOrStartTmuxTerminal,
};

const i3Directions = ['up', 'left', 'down', 'right'];
i3Directions.forEach(direction => {
  // @ts-ignore
  commands[`focus-${direction}`] = () => {
    i3FocusDirection(direction);
  };
});

export async function runCommand(
  commandOrCallback: Command,
  args: Array<any> = []
) {
  if (typeof commandOrCallback === 'function') {
    commandOrCallback(...args);
  } else {
    await execShellCommand(commandOrCallback);
  }
}
