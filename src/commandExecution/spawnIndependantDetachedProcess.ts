import { ChildProcess, spawn } from "child_process";


function commandArgs2Array(text: string): Array<string> {
  const re = /^"[^"]*"$/; // Check if argument is surrounded with double-quotes
  const re2 = /^([^"]|[^"].*?[^"])$/; // Check if argument is NOT surrounded with double-quotes

  let arr: Array<string> = [];
  let argPart: string|null = null;

  text && text.split(" ").forEach(function(arg) {
    if ((re.test(arg) || re2.test(arg)) && !argPart) {
      arr.push(arg);
    } else {
      argPart = argPart ? argPart + " " + arg : arg;
      // If part is complete (ends with a double quote), we can add it to the array
      if (/"$/.test(argPart)) {
        arr.push(argPart);
        argPart = null;
      }
    }
  });
  return arr;
}

export async function spawnIndependantDetachedProcess 
(commandString: string, additionalArgs: Array<string> = []): Promise<ChildProcess> {
  let parts = commandArgs2Array(commandString);
    const command = parts.splice(0, 1)[0];
    const childProcess = spawn(command, parts.concat(additionalArgs), {
      detached: true,
      // stdio: 'ignore',
      env: {
        'DBUS_SESSION_BUS_ADDRESS': 'unix:abstract=/tmp/dbus-QBxrHGG3gd,guid=7e4b340a0a7439301d58053e5cf2d7ba DBUS_SESSION_BUS_PID=3992',
        
      }
    });

    ['stdout', 'stderr'].forEach(channel => {
      childProcess[channel].on('data', data => {
        console.log(`${channel}: ${data}`);
      })
    })
    // childProcess.unref()
    return childProcess;
}