import { expect } from 'chai';
import { find } from 'lodash';

let testValidatorWillFail = false;
let testValidatorWillWarn = false;
function validateAccordingToFlag(input: any): IValidationResult {
  return {
    validationSuccessful: ! testValidatorWillFail,
    errors: testValidatorWillFail ? ["The testValidatorWillFail flag was set to true."] : [],
    warnings: testValidatorWillWarn ? ["The testValidatorWillWarn flag was set to true."] : [],
  }
}
function validateMinLenghtOfFive(input: string): IValidationResult {
  let valid = input.length >= 5;
  return {
    validationSuccessful: valid,
    errors: valid ? [`The given string '${input}' was too short! Minlength of 5 is required to pass!`] : [],
  }
}

let testValidator: IVariableValidator<any> = {
  name: 'A test validator',
  description: `Just some validator made up quickly for testing purposes.`
  + ` It will validate according to flags which can be set prior to invoking it.`
  + ` The default behavior is to not produce and warnings or errors.`,
  validatorFunction: validateAccordingToFlag,
}

let alwaysTrueValidator: IVariableValidator<any> = {
  name: 'Async always true validator',
  description: 'Always validates positively after a timeout',
  validatorFunction: (inupt) => {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve({
          validationSuccessful: true
        });
      }, 1);
    });
  },
}

let minlengthValidator: IVariableValidator<string> = {
  name: 'A minlength validator',
  description: `Checks if the given string is at least 5 chars long.`,
  validatorFunction: validateAccordingToFlag,
}

const testVariableType: IExtendedVariableType<string> = {
  name: 'A string variable for testing',
  schema: {},
  additionalValidators: [
    testValidator,
    minlengthValidator,
    alwaysTrueValidator,
  ],
}

async function checkVariableAgainstType<TSType> 
(variable: TSType , variableType: IExtendedVariableType<TSType>) :
Promise<IVariableCheckResult>
{
  let validationResults = await Promise.all(variableType.additionalValidators.map(
    (validator) => validator.validatorFunction(variable)));
  let errors: Array<string> = [];
  let warnings: Array<string> = [];
  let checkSuccessful = true;
  validationResults.forEach((validationResult) => {
    checkSuccessful = checkSuccessful && validationResult.validationSuccessful;
    errors = validationResult.errors ? errors.concat(validationResult.errors) : errors;
    warnings = validationResult.warnings ? errors.concat(validationResult.warnings) : warnings;
  });
  return {
    checkSuccessful,
    errors,
    warnings,
  };
}

describe.only('dynamic variables', function() {

  it('a variable can be checked against a type', async function () {
  
    testValidatorWillFail = true;
    let someVariable = 'woof';
    let checkResult = await checkVariableAgainstType(someVariable, testVariableType); 
    expect(checkResult.checkSuccessful, 'The variable check should fail!').to.be.false;
    expect(checkResult.errors).to.be.an('array').with.lengthOf(2);

    testValidatorWillFail = false;
    let anotherVariable = 'moreThanFiveLetters';
    checkResult = await checkVariableAgainstType(anotherVariable, testVariableType); 
    expect(checkResult.checkSuccessful, 'The variable check should fail!').to.be.true;
    expect(checkResult.errors).to.be.empty;


  });

});

export default false;