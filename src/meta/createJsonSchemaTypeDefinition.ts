import { compile, compileFromFile } from 'json-schema-to-typescript'
import * as Path from 'path'
import { getJsonMetaSchema } from '../getJsonMetaSchema'
import * as fs from 'fs'

export const folderForGeneratedCode = Path.resolve('src', '_generatedCode')
const fileName = 'JsonSchema.d.ts'

export async function createJsonSchemaTypeDefinition () {
  const schema = await getJsonMetaSchema()
  // const tsString = await compile(schema, 'JsonSchema')
  const tsString = await compileFromFile('/tmp/hyper.json')
  const fullPath = Path.join(folderForGeneratedCode, fileName)
  fs.writeFileSync(fullPath, tsString)
}