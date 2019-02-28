import { IEndpoint } from "./interfaces/endpoint";
import listEndpointsController from "./controllers/listEndpointsController";
import { createMapFromArray } from "./utils";

enum endpointIdentifiers {
  getEndpoints,
}


const arrayOfAllEndpoints: Array<IEndpoint> = [
  {
    identifier: endpointIdentifiers.getEndpoints,
    name: 'List available endpoints',
    description: 'Shows all endpoints which are available on the system',
    tags: [],
    methods: 'get',
    path: '/endpoints',
    middleware: listEndpointsController,
  },
];


const mapOfAllEndpoints = createMapFromArray(arrayOfAllEndpoints, 'identifier');

export {
  mapOfAllEndpoints,
  arrayOfAllEndpoints,
  endpointIdentifiers,
};