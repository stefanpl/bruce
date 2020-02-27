import * as assert from 'assert';
import { randomString } from '../utils';
import { tmuxSessionExists } from '../tmux/tmuxSessionExists';
import { tmuxCreateSession } from '../tmux/tmuxCreateSession';

describe('tmux helper functions', function() {
  it('session exists', async function() {
    const randomName = randomString(5);
    const sessionExists = await tmuxSessionExists(randomName);
    assert.strictEqual(
      sessionExists,
      false,
      `Random session '${randomName}' should not exist.`
    );

    await tmuxCreateSession(randomName);
    const existsNow = await tmuxSessionExists(randomName);
    assert(existsNow, `Session '${randomName}' should have been created`);
  });
});

export default false;
