import { TmuxSession, tmuxStartSession } from "./tmuxCreateSession";
import { tmuxSessionExists } from "./tmuxSessionExists";
import { tmuxSwitchSession } from "./tmuxSwitchSession";

export async function tmuxActivateSession (session: TmuxSession) {
  if ( ! await tmuxSessionExists(session.name)) {
    await tmuxStartSession(session)
  }
  await tmuxSwitchSession(session.name)
}
