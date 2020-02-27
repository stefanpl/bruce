import { expect } from 'chai';
import * as Ajv from 'ajv';

const ajv = new Ajv();

let testValidatorWillFail = false;
const testValidatorWillWarn = false;
function validateAccordingToFlag(input: any): IValidationResult {
  return {
    validationSuccessful: !testValidatorWillFail,
    errors: testValidatorWillFail
      ? ['The testValidatorWillFail flag was set to true.']
      : [],
    warnings: testValidatorWillWarn
      ? ['The testValidatorWillWarn flag was set to true.']
      : [],
  };
}
function validateMinLenghtOfFive(input: string): IValidationResult {
  const valid = input.length >= 5;
  return {
    validationSuccessful: valid,
    errors: valid
      ? [
        `The given string '${input}' was too short! Minlength of 5 is required to pass!`,
      ]
      : [],
  };
}

const testValidator: IVariableValidator<any> = {
  name: 'A test validator',
  description:
    'Just some validator made up quickly for testing purposes.' +
    ' It will validate according to flags which can be set prior to invoking it.' +
    ' The default behavior is to not produce and warnings or errors.',
  validatorFunction: validateAccordingToFlag,
};

const alwaysTrueValidator: IVariableValidator<any> = {
  name: 'Async always true validator',
  description: 'Always validates positively after a timeout',
  validatorFunction: inupt => {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve({
          validationSuccessful: true,
        });
      }, 1);
    });
  },
};

const minlengthValidator: IVariableValidator<string> = {
  name: 'A minlength validator',
  description: 'Checks if the given string is at least 5 chars long.',
  validatorFunction: validateAccordingToFlag,
};

const testVariableType: IExtendedVariableType<string> = {
  name: 'A string variable for testing',
  schema: {},
  additionalValidators: [
    testValidator,
    minlengthValidator,
    alwaysTrueValidator,
  ],
};

const testVariableTypeWithSchema: IExtendedVariableType<string> = {
  name: 'A string variable defined by a json schema',
  schema: { type: 'string' },
};

async function checkVariableAgainstType<TSType>(
  variable: TSType,
  variableType: IExtendedVariableType<TSType>
): Promise<IVariableCheckResult> {
  let errors: Array<string> = [];
  let warnings: Array<string> = [];
  let checkSuccessful = true;
  await _checkJsonSchema();
  await _runAdditionalValidators();
  return {
    checkSuccessful,
    errors,
    warnings,
  };

  async function _checkJsonSchema() {
    const valid = ajv.validate(variableType.schema, variable);
    if (!valid) {
      checkSuccessful = false;
      if (ajv.errors) {
        ajv.errors.forEach(error => {
          errors.push(`Schema validation failed: ${error.message}`);
        });
      }
    }
  }

  async function _runAdditionalValidators() {
    if (!variableType.additionalValidators) return;
    const validationResults = await Promise.all(
      variableType.additionalValidators.map(validator =>
        validator.validatorFunction(variable)
      )
    );
    validationResults.forEach(validationResult => {
      checkSuccessful =
        checkSuccessful && validationResult.validationSuccessful;
      errors = validationResult.errors
        ? errors.concat(validationResult.errors)
        : errors;
      warnings = validationResult.warnings
        ? errors.concat(validationResult.warnings)
        : warnings;
    });
  }
}

describe('dynamic variables', function() {
  it('a variable can be checked against a type', async function() {
    testValidatorWillFail = true;
    const someVariable = 'woof';
    let checkResult = await checkVariableAgainstType(
      someVariable,
      testVariableType
    );
    expect(checkResult.checkSuccessful, 'The variable check should fail!').to.be
      .false;
    expect(checkResult.errors)
      .to.be.an('array')
      .with.lengthOf(2);

    testValidatorWillFail = false;
    const anotherVariable = 'moreThanFiveLetters';
    checkResult = await checkVariableAgainstType(
      anotherVariable,
      testVariableType
    );
    expect(checkResult.checkSuccessful, 'The variable check should succeed!').to
      .be.true;
    expect(checkResult.errors).to.be.empty;
  });

  it('should validate against a given schema', async function() {
    const someVariable = 'Should definitely match';
    let checkResult = await checkVariableAgainstType(
      someVariable,
      testVariableTypeWithSchema
    );
    expect(checkResult.checkSuccessful, 'The variable check should succeed').to
      .be.true;
    expect(checkResult.errors).to.be.empty;

    const anotherVariable: string = (123 as unknown) as string;
    checkResult = await checkVariableAgainstType(
      anotherVariable,
      testVariableTypeWithSchema
    );
    expect(checkResult.checkSuccessful, 'The variable check should fail!').to.be
      .false;
    expect(checkResult.errors)
      .to.be.an('array')
      .with.lengthOf(1);
  });
});

export default false;
