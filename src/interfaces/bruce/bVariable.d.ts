import { JSONSchema7 } from "json-schema";

interface bVariable<BaseType> {
  jsonSchema: JSONSchema7,
  name: string,
  description?: string,
  aliases?: Array<string>,
}
