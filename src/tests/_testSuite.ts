const logWhyRunning = process.env.WHY_IS_NODE_RUNNING
if (logWhyRunning) {
  var log = require('why-is-node-running')
}
import './endpointTesting';
import './variable.test';
import './tmux.test';
import './i3/i3MsgExecutionSuccessful';
import './bFunctions.test';
import './jsonSchema.test';
import './execShellCommand.test';
import server from '../server';
import './quickTest';
require('dotenv-safe').config();
const httpPortForTesting = process.env.NODE_HTTP_PORT_TESTING;

before('Suite setup', async function suiteSetup() {
  await server.start(httpPortForTesting);
});

after('Suite teardown', async function suiteTeardown() {
  await server.close();
  if (logWhyRunning) {
    setTimeout(log, 200)
  }
});