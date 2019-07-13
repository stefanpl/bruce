import { i3FocusOrOpenWindow } from "./i3FocusOrOpenWindow";
import { TMUX_TERMINAL_TITLE } from "./switchToBruceMode";

export function focusOrStartTmuxTerminal() {
  i3FocusOrOpenWindow(`title="${TMUX_TERMINAL_TITLE}"`, `zsh -c launch-tmux-terminal`)
}