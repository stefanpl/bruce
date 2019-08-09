import { JSONSchema7 } from "json-schema";
import Ajv from 'ajv';

interface JSONSchemaValidationResult {
  isValid: boolean,
}

const ajv = new Ajv({});

export async function validateDataAgainstJsonSchema(data: any, schema: JSONSchema7): Promise<JSONSchemaValidationResult> {

  const validate = ajv.compile(schema);
  const isValid = await validate(data);
  return {
    isValid: !!isValid
  }

}