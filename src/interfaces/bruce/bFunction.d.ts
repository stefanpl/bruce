import { bParameter } from "./bParameter";

type bFunctionNamespace = string
type CompilesToTypescriptExpression = string | ( () => string | Promise<string> )

export interface bFunction {
  namespace: bFunctionNamespace,
  name: string,
  slug: string,
  codeName?: string,
  aliases?: Array<string>,
  description?: string,
  parameters?: Array<bParameter<any>>,
  return: bReturnValue<any>,
  isAsync: boolean,
  imports?: Array<string>
  body: Array<CompilesToTypescriptExpression>
}