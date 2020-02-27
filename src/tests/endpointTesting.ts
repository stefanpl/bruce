import { find } from 'lodash-es';
import * as assert from 'assert';
import {
  getRequestToServer,
  assertUtf8JsonResponse,
  postRequestToServer,
} from './_testUtils';
import { endpointByIdentifier } from '../utils';
import { endpointIdentifiers } from '../endpoints';

describe('The endpoint:', function() {
  it('GET /endpoints returns at least itself as an available endpoint', async function() {
    const endpoint = endpointByIdentifier(endpointIdentifiers.getEndpoints);
    const response = await getRequestToServer(endpoint.path);
    assertUtf8JsonResponse(response);

    const expectedKey = 'availableEndpoints';
    assert(
      !!response.data[expectedKey] && Array.isArray(response.data[expectedKey]),
      `The response must contain a key '${expectedKey}', which must be an array. Received: ${response.data[expectedKey]}`
    );

    const expectedEndpointName = endpoint.name;
    assert(
      !!find(response.data[expectedKey], endpoint => {
        return endpoint.name === expectedEndpointName;
      }),
      `Expected to receive an endpoint named '${expectedEndpointName}', but did not find one in the response object.`
    );
  });

  it('creates a new function execution', async function() {
    const endpoint = endpointByIdentifier(
      endpointIdentifiers.functionExecution
    );
    const response = await postRequestToServer(
      '/function-execution/show-workspace',
      { arguments: [5] }
    );
    assertUtf8JsonResponse(response);
  });

  it('serves CORS headers correctly', async function() {
    const endpoint = endpointByIdentifier(endpointIdentifiers.getEndpoints);
    const response = await getRequestToServer(endpoint.path);
    console.log(
      `header is ${response.headers['access-control-allow-origin']}, ${response.headers['Access-Control-Allow-Origin']}`
    );
    assert(
      response.headers['access-control-allow-origin'] === '*' ||
        response.headers['Access-Control-Allow-Origin'] === '*'
    );
  });
});

export default false;
