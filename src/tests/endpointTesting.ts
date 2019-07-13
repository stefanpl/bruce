import { getRequestToServer, assertUtf8JsonResponse, postRequestToServer } from "./_testUtils";
import { find } from 'lodash-es';
import { endpointByIdentifier } from "../utils";
import { endpointIdentifiers } from "../endpoints";
import * as assert from 'assert';

describe('The endpoint:', function() {

  it('GET /endpoints returns at least itself as an available endpoint', async function () {
    let endpoint = endpointByIdentifier(endpointIdentifiers.getEndpoints);
    let response = await getRequestToServer(endpoint.path);
    assertUtf8JsonResponse(response);

    let expectedKey = 'availableEndpoints';
    assert(!!response.data[expectedKey] && Array.isArray(response.data[expectedKey]), 
      `The response must contain a key '${expectedKey}', which must be an array. Received: ${response.data[expectedKey]}`);

    let expectedEndpointName = endpoint.name;
    assert(!!find(response.data[expectedKey], (endpoint) => { return endpoint.name === expectedEndpointName }), 
      `Expected to receive an endpoint named '${expectedEndpointName}', but did not find one in the response object.`);
  });

  it('creates a new function execution', async function () {
    let endpoint = endpointByIdentifier(endpointIdentifiers.functionExecution);
    let response = await postRequestToServer('/function-execution/show-workspace', {arguments: [5]});
    assertUtf8JsonResponse(response);
  });

  it('serves CORS headers correctly', async function () {
    let endpoint = endpointByIdentifier(endpointIdentifiers.getEndpoints);
    let response = await getRequestToServer(endpoint.path);
    console.log(`header is ${response.headers['access-control-allow-origin']}, ${response.headers['Access-Control-Allow-Origin']}`);
    assert(response.headers['access-control-allow-origin'] === '*' || response.headers['Access-Control-Allow-Origin'] === '*');
  });
   
});

export default false;