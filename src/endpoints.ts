import { IEndpoint } from "./interfaces/endpoint";
import listEndpointsController from "./controllers/listEndpointsController";
import { createMapFromArray } from "./utils";
import listFunctionsController from "./controllers/listFunctionsController";
import createFunctionExecutionController from "./controllers/createFunctionExecutionController";
import * as bodyParser from 'koa-bodyparser';

enum endpointIdentifiers {
  getEndpoints,
  getFunctions,
  functionExecution,
}



const arrayOfAllEndpoints: Array<IEndpoint> = [
  {
    identifier: endpointIdentifiers.getEndpoints,
    name: 'List available endpoints',
    description: 'Shows all endpoints which are available on the system',
    tags: [],
    methods: 'get',
    path: '/endpoints',
    middleware: [
      listEndpointsController,
    ],
  },
  {
    identifier: endpointIdentifiers.getFunctions,
    name: 'List available functions',
    description: 'Shows all functions which are available on the system',
    tags: [],
    methods: 'get',
    path: '/functions',
    middleware: listFunctionsController,
  },
  {
    identifier: endpointIdentifiers.functionExecution,
    name: 'Start executing a function',
    description: 'Begin executing a function which is provided by the system',
    tags: [],
    methods: 'post',
    path: '/function-execution/:functionIdentifier',
    middleware: [
      bodyParser(),
      createFunctionExecutionController,
    ]
  },
];


const mapOfAllEndpoints = createMapFromArray(arrayOfAllEndpoints, 'identifier');

export {
  mapOfAllEndpoints,
  arrayOfAllEndpoints,
  endpointIdentifiers,
};