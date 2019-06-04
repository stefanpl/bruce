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
  const debug = !! process.env.KEEP_PROCESSES_OPEN
  let parts = commandArgs2Array(commandString);
  const command = parts.splice(0, 1)[0];
  const childProcess = spawn(command, parts.concat(additionalArgs), {
    detached: true,
    stdio: debug ? 'pipe' : 'ignore',
  });
  _debugProcessOutput()
  childProcess.unref()
  return childProcess;
  
  function _debugProcessOutput() {
    if ( ! debug) return
    ['stdout', 'stderr'].forEach(channel => {
      childProcess[channel].on('data', data => {
        console.log(`${channel}: ${data}`);
      })
    })
  }
}