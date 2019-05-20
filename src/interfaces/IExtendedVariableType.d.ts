interface IExtendedVariableType<TypescriptType> extends ChattyEntity {

  schema: IJsonSchema,
  additionalValidators?: Array<IVariableValidator<TypescriptType>>,
  
}