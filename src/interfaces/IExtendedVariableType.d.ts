interface IExtendedVariableType<TSType> extends ChattyEntity {

  schema: IJsonSchema,
  additionalValidators?: Array<IVariableValidator<TSType>>,
  
}