import * as sudo from 'sudo-prompt'

/**
* This solution is only suitable for local invocations of a function.
* It will open a dialog box, asking for sudo permissions.
* kdesudo needs to be installed!
* To force authentication (empty the sudo password cache), call `sudo -k`
*
* A more suitable approach would be to ask the for the password inside the node app,
*  store it internally and pass it to a sudo command created via 'spawn'
* This would also allow for more flexibility (streaming output) and security (passing args as array)
*/
export async function executeAsSudo (command: string, appName?: string): Promise<string> {
  return new Promise(function(resolve, reject) {
    const options = { name: appName ? appName : 'node app' }
    sudo.exec(command, options, function(error, stdout, stderr) {
      if (error) reject(error);
      if (stderr) reject(stderr)
      resolve(stdout)
    }
    );
  });
}