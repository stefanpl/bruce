import * as cp from 'child_process';

function execShellCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
   cp.exec(command, (error, stdout, stderr) => {
    if (error) {
     console.warn(error);
    }
    resolve(stdout? stdout : stderr);
   });
  });
}

function i3ResultIsSuccessful(i3result): boolean {
  try {
    const resultArray = JSON.parse(i3result);
    return !! resultArray[0].success;
  } catch(err) {
    return false;
  }
}



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

export async function i3FocusOrOpenWindow (windowMatchingExpression, commandToOpen) {
  const i3msg = '/usr/bin/i3-msg';
  const escapedExpression = windowMatchingExpression.replace(/"/g, '\\"');
  const command = `${i3msg} [${escapedExpression}] focus`
  const result = await execShellCommand(command);
  if ( ! i3ResultIsSuccessful(result)) {
    let parts = commandArgs2Array(commandToOpen);
    const command = parts.splice(0, 1)[0];
    cp.spawn(command, parts, {
      detached: true,
    });
  }
}