import * as assert from 'assert';
import { promisify } from 'util';
import * as fs from 'fs';
import { IEndpoint } from './interfaces/endpoint';
import { mapOfAllEndpoints } from './endpoints';

export function randomIntFromInterval(
  minValue: number,
  maxValue: number
): number {
  assert.strictEqual(
    minValue % 1,
    0,
    `Only integers are accepted. minValue was ${minValue}`
  );
  assert.strictEqual(
    maxValue % 1,
    0,
    `Only integers are accepted. maxValue was ${maxValue}`
  );
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

export enum Charset {
  LETTERS_ONLY,
  LETTERS_LOWERCASE,
}
const charsetLetters: Record<Charset, string> = {
  [Charset.LETTERS_ONLY]:
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  [Charset.LETTERS_LOWERCASE]: 'abcdefghijklmnopqrstuvwxyz',
};
export function randomString(
  length: number = 10,
  charset: Charset = Charset.LETTERS_LOWERCASE
): string {
  const charsetString: string = charsetLetters[charset];
  const highestIndex: number = charsetString.length - 1;
  let result = '';
  for (let index = 0; index < length; index++) {
    result += charsetString[randomIntFromInterval(0, highestIndex)];
  }
  return result;
}

function createMapFromArray<
  ArrayElementType,
  KeyType extends keyof ArrayElementType
>(
  inputArray: Array<ArrayElementType>,
  fieldUsedAsKey: KeyType
): Map<ArrayElementType[KeyType], ArrayElementType> {
  const map = new Map();
  inputArray.forEach(function assignArrayElementToMap(arrayElement) {
    if (arrayElement[fieldUsedAsKey] === undefined) {
      throw new Error(
        `Could not index '${arrayElement}'. Missing key '${fieldUsedAsKey}'`
      );
    }
    if (map.get(arrayElement[fieldUsedAsKey]) !== undefined) {
      throw new Error(
        `Tried to create a map, but found duplicate key '${arrayElement[fieldUsedAsKey]}'`
      );
    }
    map.set(arrayElement[fieldUsedAsKey], arrayElement);
  });
  return map;
}

function endpointByIdentifier(endpointIdentifier: number): IEndpoint {
  const endpoint = mapOfAllEndpoints.get(endpointIdentifier);
  if (endpoint === undefined) {
    throw new Error(
      `Could not get endpoint by identifier '${endpointIdentifier}'.`
    );
  }
  return endpoint;
}

export function getFunctionName(sayMyName: Function): string {
  return sayMyName.name ? sayMyName.name : '[anonymous]';
}

export async function mustThrow(
  functionExpectedToThrow: Function,
  expectedErrorRegex?: string
) {
  let errorHasBeenCaught = false;
  try {
    await functionExpectedToThrow();
  } catch (e) {
    errorHasBeenCaught = true;
    if (expectedErrorRegex) {
      const regex = new RegExp(expectedErrorRegex, 'i');
      const errorMessageContainsRegex = !!e.message.match(regex);
      assert.strictEqual(
        errorMessageContainsRegex,
        true,
        `Error message must contain regex '${expectedErrorRegex}', but was '${e.message}'.`
      );
    }
  } finally {
    const functionName = getFunctionName(functionExpectedToThrow);
    assert.strictEqual(
      errorHasBeenCaught,
      true,
      `The given function '${functionName}' should have raised an error.`
    );
  }
}

export async function waitSomeTime(timeInMs) {
  return new Promise(resolve => {
    setTimeout(resolve, timeInMs);
  });
}

export enum RETURN_AS_ARRAY_UNDEFINED_BEHAVIOR {
  THROW,
  EMPTY_ARRAY,
  UNDEFINED_ARRAY_ELEMENT,
}

export async function readUtf8File(filePath: string): Promise<string> {
  return new Promise(resolve => {
    fs.readFile(
      filePath,
      {
        encoding: 'utf8',
      },
      (err, data) => {
        if (err) throw err;
        resolve(data);
      }
    );
  });
}

export const writeFile: (
  path: string,
  text: string,
  options?: object
) => Promise<void> = promisify(fs.writeFile);

export function isArray(variable: any): boolean {
  return Array.isArray(variable);
}

export function returnAsArray(
  whateverYouGiveMe: any,
  allowUndefined: RETURN_AS_ARRAY_UNDEFINED_BEHAVIOR = RETURN_AS_ARRAY_UNDEFINED_BEHAVIOR.THROW
): Array<any> {
  if (isArray(whateverYouGiveMe)) {
    return whateverYouGiveMe;
  }
  if (whateverYouGiveMe === undefined) {
    switch (allowUndefined) {
      case RETURN_AS_ARRAY_UNDEFINED_BEHAVIOR.EMPTY_ARRAY:
        return [];
      case RETURN_AS_ARRAY_UNDEFINED_BEHAVIOR.THROW:
        throw new Error(
          "'undefined' has been passed, but not allowed via 'allowUndefined'."
        );
      case RETURN_AS_ARRAY_UNDEFINED_BEHAVIOR.UNDEFINED_ARRAY_ELEMENT:
        return [undefined];
    }
  }
  return [whateverYouGiveMe];
}

export { createMapFromArray, endpointByIdentifier };
