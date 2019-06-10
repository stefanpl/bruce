import * as camelCase from 'camelcase';
import { folderForGeneratedCode } from '../meta/createJsonSchemaTypeDefinition';
import { resolve as resolvePath } from 'path'
import { readUtf8File, writeFile } from '../utils';
import * as Mustache from 'mustache';
import { bFunction } from '../interfaces/bruce/bFunction';

export const templateDirectory = resolvePath('src', 'templates')

export async function renderBFunctionToFile (functionToRender: bFunction) {
  functionToRender.codeName = camelCase(functionToRender.namespace +
    (functionToRender.codeName ? functionToRender.codeName : functionToRender.slug))
  const fileName = functionToRender.codeName + '.ts'
  const fullPathToRenderFile = resolvePath(folderForGeneratedCode, fileName)
  const templateString = await readUtf8File(resolvePath(templateDirectory, 'function.mustache'))
  await writeFile(fullPathToRenderFile, Mustache.render(templateString, functionToRender))
}