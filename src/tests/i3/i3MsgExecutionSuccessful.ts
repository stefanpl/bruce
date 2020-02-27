import * as assert from 'assert';
import { execShellCommand } from '../../commandExecution/execShellCommand';
import { i3MsgBinary } from '../../i3FocusWorkspace';
import { i3MsgExecutionSuccessful } from '../../i3/i3MsgExecutionSuccessful';

describe('i3MsgExecutionSuccessful', () => {
  it('checks for successful and unsuccessful executions', async () => {
    const testCases = [
      {
        command: 'focus',
        expectedSuccessful: false,
      },
      {
        command: 'workspace 1',
        expectedSuccessful: true,
      },
    ];
    await Promise.all(
      testCases.map(async testCase => {
        const result = await execShellCommand(i3MsgBinary, [testCase.command]);
        assert.strictEqual(
          i3MsgExecutionSuccessful(result),
          testCase.expectedSuccessful,
          `i3msg command '${testCase.command}' did not yield the expected result.`
        );
      })
    );
  });
});

export default false;
