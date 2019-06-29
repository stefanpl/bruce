import { TmuxSession, tmuxStartSession } from "./tmuxCreateSession";
import { tmuxSessionExists } from "./tmuxSessionExists";
import { tmuxSwitchSession } from "./tmuxSwitchSession";

export async function tmuxActivateSession (session: TmuxSession) {
  if ( ! await tmuxSessionExists(session.name)) {
    await tmuxStartSession(session)
  }
  try {
    await tmuxSwitchSession(session.name)
  } catch(err) {
    if (err.message.match('no current client')) {
      throw Error(`No tmux client has been started. `
      + `Ensure a tmux client is running before trying to activate a session. `
      + `startTmuxTerminal() and tmuxWaitForClient() will come in handy.`);
    }
  }
}
