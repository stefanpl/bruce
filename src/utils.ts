import { IEndpoint } from "./interfaces/endpoint";
import { mapOfAllEndpoints } from "./endpoints";
import * as assert from 'assert';

export enum Charset {
  LETTERS_ONLY,
  LETTERS_LOWERCASE,
}
const charsetLetters: Record<Charset, string> = {
  [Charset.LETTERS_ONLY]: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  [Charset.LETTERS_LOWERCASE]: "abcdefghijklmnopqrstuvwxyz",
}
export function randomString(length: number = 10, charset: Charset = Charset.LETTERS_LOWERCASE): string {
  const charsetString: string = charsetLetters[charset]
  const highestIndex: number = charsetString.length - 1
  let result = ''
  for (let index = 0; index < length; index++) {
    result += charsetString[randomIntFromInterval(0, highestIndex)]
  }
  return result
}

export function randomIntFromInterval(minValue: number, maxValue: number): number {
  assert.strictEqual(minValue % 1, 0, `Only integers are accepted. minValue was ${minValue}`)
  assert.strictEqual(maxValue % 1, 0, `Only integers are accepted. maxValue was ${maxValue}`)
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

function createMapFromArray<ArrayElementType, KeyType extends keyof ArrayElementType> 
(inputArray: Array<ArrayElementType>, fieldUsedAsKey: KeyType): 
Map<ArrayElementType[KeyType], ArrayElementType> {
  let map = new Map();
  inputArray.forEach(function assignArrayElementToMap(arrayElement) {
    if (arrayElement[fieldUsedAsKey] === undefined) {
      throw new Error(`Could not index '${arrayElement}'. Missing key '${fieldUsedAsKey}'`);
    }
    if (map.get(arrayElement[fieldUsedAsKey]) !== undefined) {
      throw new Error(`Tried to create a map, but found duplicate key '${arrayElement[fieldUsedAsKey]}'`);
    }
    map.set(arrayElement[fieldUsedAsKey], arrayElement);
  });
  return map;
}

function endpointByIdentifier(endpointIdentifier: number): IEndpoint {
  let endpoint = mapOfAllEndpoints.get(endpointIdentifier);
  if (endpoint === undefined) {
    throw new Error(`Could not get endpoint by identifier '${endpointIdentifier}'.`);
  }
  return endpoint;
}


export function getFunctionName(sayMyName: Function): string {
  return sayMyName.name ? sayMyName.name : '[anonymous]';
}


export async function mustThrow(functionExpectedToThrow: Function, expectedErrorRegex?: string) {
  let errorHasBeenCaught = false;
  try {
    await functionExpectedToThrow();
  } catch (e) {
    errorHasBeenCaught = true;
    if (expectedErrorRegex) {
      let regex = new RegExp(expectedErrorRegex, 'i');
      let errorMessageContainsRegex = !! e.message.match(regex);
      assert.strictEqual(errorMessageContainsRegex, true,
        `Error message must contain regex '${expectedErrorRegex}', but was '${e.message}'.`);
    }
  } finally {
    let functionName = getFunctionName(functionExpectedToThrow);
    assert.strictEqual(errorHasBeenCaught, true,
      `The given function '${functionName}' should have raised an error.`);
  }
}

export {
  createMapFromArray,
  endpointByIdentifier,
}