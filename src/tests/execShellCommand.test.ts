import * as assert from 'assert';
import { execShellCommand } from '../execShellCommand';
import { randomString, mustThrow } from '../utils';
import * as fs from 'fs';

describe('shell command execution', function() {

  it('uses a string with spaces as multiple arguments', async function () {
    
    const randomName1 = randomString(10)
    const randomName2 = randomString(10)
    const result = await execShellCommand(`touch /tmp/${randomName1} /tmp/${randomName2}`)
    
    try {
      fs.statSync(`/tmp/${randomName1}`)
      fs.statSync(`/tmp/${randomName2}`)
    } catch (err) {
      throw Error(`Files should have been created. Error: ${err.message}`)
    }

    assert.strictEqual(result.exitCode, 0)

  });

  it('throws an error if an unknown command is used', async function () {
    const unknownCommand = randomString()
    await mustThrow(async () => {
      await execShellCommand(unknownCommand)
    })
  });

});

export default false;