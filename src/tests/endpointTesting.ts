import { getRequestToServer, assertUtf8JsonResponse } from "./_testUtils";
import { find } from 'lodash';
import { endpointByIdentifier } from "../utils";
import { endpointIdentifiers } from "../endpoints";
const assert = require('assert');

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
   
});

export default false;