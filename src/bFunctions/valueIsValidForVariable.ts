import * as Ajv from 'ajv';
import { bVariable } from '../interfaces/bruce/bVariable';

export function valueIsValidForVariable<ValueType>(
  value: ValueType,
  variable: bVariable<ValueType>
): boolean {
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  // TODO: save compile function to avoid recompilation
  const validate = ajv.compile(variable.jsonSchema);
  return !!validate(value);
}
