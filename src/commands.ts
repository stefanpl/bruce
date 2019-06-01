import { i3FocusOrOpenWindow } from "./i3FocusOrOpenWindow";
import { execShellCommand } from "./commandExecution/execShellCommand";
import { i3FocusWorkspace } from "./i3FocusWorkspace";
import { i3Focus } from "./i3Functions";
import { switchToBruceMode } from "./switchToBruceMode";

type Command = (string | Function)


export const commands: Record<string, Command> = {
  "media-next": 'playerctl next',
  "media-pause": 'playerctl pause',
  "reload": 'xdotool key ctrl+r',
  "focus-spotify": () => i3FocusOrOpenWindow('class="Spotify"', 'spotify'),
  "show-workspace": i3FocusWorkspace,
  "bruce": switchToBruceMode,
  "show-tmux-terminal": switchToBruceMode,
}

const i3Directions = ['up', 'left', 'down', 'right']
i3Directions.forEach( direction => {
  commands[`focus-${direction}`] = () => { i3Focus(direction) }
})

export async function runCommand (commandOrCallback: Command, args) {
  if ( typeof commandOrCallback === 'function') {
    commandOrCallback.apply(null, args)
  } else {
    await execShellCommand(commandOrCallback)
  }
}