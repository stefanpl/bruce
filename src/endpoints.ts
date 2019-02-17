import { Endpoint } from "./interfaces/endpoint";
import listEndpointsController from "./controllers/listEndpointsController";

const arrayOfAllEndpoints: Array<Endpoint> = [
  {
    name: 'List available endpoints',
    identifier: 'get-endpoints',
    description: 'Shows all endpoints which are available on the system',
    tags: [],
    methods: 'get',
    path: '/endpoints',
    middleware: listEndpointsController,
  },
];

// TODO: createMapFromArray is a utility function. Should not be in this file.


function createMapFromArray<ArrayType, KeyType extends keyof ArrayType> 
(inputArray: Array<ArrayType>, fieldUsedAsKey: KeyType): 
Map<KeyType, ArrayType> {
  let map = new Map();
  inputArray.forEach(function assignArrayElementToMap(arrayElement) {
    if ( ! arrayElement[fieldUsedAsKey]) {
      throw new Error(`Could not index '${arrayElement}'. Missing key '${fieldUsedAsKey}'`);
    }
    map.set(arrayElement[fieldUsedAsKey], arrayElement);
  });
  return map;
}

let mapOfAllEndpoints = createMapFromArray(arrayOfAllEndpoints, 'identifier');

export {
  mapOfAllEndpoints,
  arrayOfAllEndpoints,
};