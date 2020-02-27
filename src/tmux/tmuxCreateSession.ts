import { expectSuccessfulExecution } from '../commandExecution/expectSuccessfulExecution';
import { returnAsArray, waitSomeTime } from '../utils';

// -d detach – don't attach running tmux to created session/window
const baseArguments = ['-d'];
// TODO: this should not be necessary
const timeoutBeforeSendingKeys = 1000;

export async function tmuxCreateSession(
  sessionName: string,
  command?: string
): Promise<void> {
  await expectSuccessfulExecution(
    'tmux new -d -s',
    command ? [sessionName, command] : [sessionName]
  );
}

export async function tmuxStartSession(session: TmuxSession) {
  session.windows = session.windows ? session.windows : [{}];
  const windowArguments = session.windows.map(window => _argsForWindow(window));
  await _createWindows();
  await waitSomeTime(timeoutBeforeSendingKeys);
  await _sendKeys();

  async function _createWindows() {
    // For loop – sequential execution!
    for (
      let windowIndex = 0;
      windowIndex < windowArguments.length;
      windowIndex++
    ) {
      const createArguments =
        windowIndex === 0
          ? ['new-session', '-s', session.name]
          : ['new-window'];
      const allArguments = createArguments.concat(
        baseArguments,
        windowArguments[windowIndex]
      );
      await expectSuccessfulExecution('tmux', allArguments);
    }
  }

  async function _sendKeys() {
    await Promise.all(
      (session.windows as Array<TmuxWindow>).map(async (window, index) => {
        if (!window.keysToBeSent) return;
        const args = ['send-keys', '-t', `${session.name}:${index + 1}`].concat(
          window.keysToBeSent
        );
        await expectSuccessfulExecution('tmux', args);
      })
    );
  }

  function _argsForWindow(window: TmuxWindow): Array<string> {
    const args = [
      '-c',
      window.workingDir ? window.workingDir : session.defaultWorkingDir,
    ];
    if (window.name) {
      args.push('-n', window.name);
    }
    return args.concat(
      returnAsArray(window.command ? window.command : session.defaultCommand)
    );
  }
}
