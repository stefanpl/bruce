import * as assert from 'assert';
import { numberVariable } from './dummyData/bVariables';
import { valueIsValidForVariable } from '../bFunctions/valueIsValidForVariable';
import { getJsonMetaSchema } from '../getJsonMetaSchema';
import { bVariable } from '../interfaces/bruce/bVariable';

describe('bruce functions', function() {
  it('are based on basic variable validation', async function() {
    const someNumber = 42;
    const noNumber = '1337';
    assert(valueIsValidForVariable(someNumber, numberVariable));
    assert(!valueIsValidForVariable(noNumber, numberVariable));
  });

  it('validate a schema again the json meta schema', async function() {
    this.timeout(0);
    const validSchema = numberVariable.jsonSchema;
    const invalidSchema = { type: 'any' };

    const schemaVariable: bVariable<Object> = {
      jsonSchema: await getJsonMetaSchema(),
      name: 'JSON Schema',
      description:
        'A json schema declaration validated against the latest' +
        ' [validation meta schema](https://json-schema.org/specification.html#meta-schemas).',
    };

    assert(
      valueIsValidForVariable(validSchema, schemaVariable),
      'Valid schema should validate against meta schema'
    );
    assert(
      !valueIsValidForVariable(invalidSchema, schemaVariable),
      'Invalid schema should not validate against meta schema'
    );
  });
});

export default false;
