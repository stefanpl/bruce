import { Endpoint } from "./interfaces/endpoint";
import { mapOfAllEndpoints } from "./endpoints";
import { Key } from "readline";


function createMapFromArray<ArrayElementType, KeyType extends keyof ArrayElementType> 
(inputArray: Array<ArrayElementType>, fieldUsedAsKey: KeyType): 
Map<ArrayElementType[KeyType], ArrayElementType> {
  let map = new Map();
  inputArray.forEach(function assignArrayElementToMap(arrayElement) {
    if (arrayElement[fieldUsedAsKey] === undefined) {
      throw new Error(`Could not index '${arrayElement}'. Missing key '${fieldUsedAsKey}'`);
    }
    if (map.get(arrayElement[fieldUsedAsKey]) !== undefined) {
      throw new Error(`Tried to create a map, but found duplicate key '${arrayElement[fieldUsedAsKey]}'`);
    }
    map.set(arrayElement[fieldUsedAsKey], arrayElement);
  });
  return map;
}

function endpointByIdentifier(endpointIdentifier: number): Endpoint {
  let endpoint = mapOfAllEndpoints.get(endpointIdentifier);
  if (endpoint === undefined) {
    throw new Error(`Could not get endpoint by identifier '${endpointIdentifier}'.`);
  }
  return endpoint;
}

export {
  createMapFromArray,
  endpointByIdentifier,
}