interface IValidationResult {

  validationSuccessful: boolean,
  warnings?: Array<string>,
  errors?: Array<string>,

}