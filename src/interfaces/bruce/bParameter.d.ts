import { bVariable } from "./bVariable";

interface bParameter<BaseType> {
  variable: bVariable<BaseType>,
  name: string,
  description?: string,
  nameInCode?: string,
  aliases?: Array<string>,
  required?: boolean,
  defaultValue?: BaseType,
}