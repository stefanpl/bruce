import './endpointTesting';
import './variable.test';
import './tmux.test';
import './i3/i3MsgExecutionSuccessful';
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
});