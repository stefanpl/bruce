import { bVariable } from "../../interfaces/bruce/bVariable";
import { bFunction } from "../../interfaces/bruce/bFunction";

const voidVariable: bVariable<void> = {
  jsonSchema: {},
  name: 'Void base variable',
}

const i3WorkspaceIdentifierVariable: bVariable<string | number> = {
  jsonSchema: {
    type: ["string", "number"]
  },
  name: 'An identifier matching an i3 workspace.'
}

export const i3FocusWorkspaceData: bFunction = {
  namespace: 'i3',
  name: 'focus given workspace',
  slug: 'focus-workspace',
  return: {
    description: 'Returns a promise, resolving to nothing. Should return a process identifier of some kind',
    variable: voidVariable
  },
  parameters: [
    {
      name: 'Workspace to be focused',
      nameInCode: 'workspaceIdentifier',
      required: true,
      variable: i3WorkspaceIdentifierVariable,
    }
  ],
  imports: [
    'import { execShellCommand } from "./../commandExecution/execShellCommand";',
    'import { i3MsgExecutionSuccessful } from "./../i3/i3MsgExecutionSuccessful";',
    'import { EXECUTABLE_PATH_i3_MSG } from "./../i3Functions";'
  ],
  isAsync: true,
  body: [
    "const command = `${EXECUTABLE_PATH_i3_MSG} workspace ${workspaceIdentifier}`;",
    "const result = await execShellCommand(command);",
    "if ( ! i3MsgExecutionSuccessful(result)) {",
      "throw Error(`Invalid i3 result. Put this check into its own function!`);",
    "}",
  ]
}