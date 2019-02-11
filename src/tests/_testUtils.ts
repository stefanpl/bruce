import axios, { AxiosResponse } from 'axios';
const { URL } = require('url');
require('dotenv-safe').config();
const httpPortDefault = process.env.HTTP_PORT;
const assert = require('assert');

async function getRequestToServer (route: string): Promise<AxiosResponse> {
  let fullUrl = new URL(route, `http://127.0.0.1:${httpPortDefault}/${route}`);
  return axios.get(fullUrl.href);
}

function assertUtf8JsonResponse (response: AxiosResponse) {
  let expectedContentType = "application/json; charset=utf-8";
  let actualContentType = response.headers['content-type'];
  assert(actualContentType, expectedContentType,
  `Expected response to be of content-type '${expectedContentType}', but was '${actualContentType}'.`);
}

export {
  getRequestToServer,
  assertUtf8JsonResponse,
}