import { stringVariable, numberVariable } from "./bVariables";
import { bFunction } from "../../interfaces/bruce/bFunction";

const logStringAndReturnLength: bFunction = {
  namespace: 'bruce',
  name: 'Log string and return its length',
  slug: 'log-string-and-return-length',
  description: "",
  aliases: ['log and return', 'logar', 'lrl'],
  parameters: [
    {
      name: 'Input String',
      description: 'The input string which will be put to the console.',
      aliases: ['input', 'string'],
      variable: stringVariable,
    }
  ],
  return: {
    description: 'The length of the string put into the function.',
    variable: numberVariable,
  },
  isAsync: false,
  body: [
    'console.log(inputString)',
    'return inputString.length',
  ],
}