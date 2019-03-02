interface IVariableValidator<ExtendedVariableType> extends ChattyEntity {

  validatorFunction: (input: ExtendedVariableType) => IValidationResult | Promise<IValidationResult> ,

}