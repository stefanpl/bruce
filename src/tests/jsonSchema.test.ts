import * as assert from 'assert'
import { JSONSchema7 } from 'json-schema';
import { validateDataAgainstJsonSchema } from '../validateDataAgainstJsonSchema';

const stringJsonSchema: JSONSchema7 = {
  type: "number",
}

describe.only('JSON schema functionality', function() {

  it('string does not validate against number', async function () {
    const stringData = "I am a string, not a number";
    const check = await validateDataAgainstJsonSchema(stringData, stringJsonSchema);
    assert(check.isValid === false, "String should not validate against number type");
  });

});

export default false