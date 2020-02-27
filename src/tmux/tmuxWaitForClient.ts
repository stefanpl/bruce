import * as assert from 'assert';
import { tmuxHasClient } from './tmuxHasClient';

const waitBetweenAttempts = 100;

/**
 * Wait until there is at least one tmux client available
 */
export async function tmuxWaitForClient(
  maxTimeoutInMilliseconds: number = 2000
): Promise<void> {
  assert(
    maxTimeoutInMilliseconds > 0,
    `Given timeout must be > 0, but was ${maxTimeoutInMilliseconds}`
  );
  const startTime = Date.now();
  return new Promise(async function(resolve, reject) {
    _checkForClients();
    async function _checkForClients() {
      if (Date.now() - startTime > maxTimeoutInMilliseconds) {
        return reject(
          Error(
            `Could not find a tmux client within ${maxTimeoutInMilliseconds} ms.`
          )
        );
      }
      if (await tmuxHasClient()) {
        resolve();
      } else {
        setTimeout(_checkForClients, waitBetweenAttempts);
      }
    }
  });
}
