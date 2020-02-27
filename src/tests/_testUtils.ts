import axios, { AxiosResponse } from 'axios';
import server from '../server';

const { URL } = require('url');
require('dotenv-safe').config();

const httpPortDefault = process.env.NODE_HTTP_PORT;
const assert = require('assert');

async function getRequestToServer(route: string): Promise<AxiosResponse> {
  const fullUrl = new URL(
    route,
    `http://127.0.0.1:${httpPortDefault}/${route}`
  );
  return axios.get(fullUrl.href);
}

async function postRequestToServer(
  route: string,
  data: any
): Promise<AxiosResponse> {
  // @ts-ignore
  const { httpPort } = server.app;
  const fullUrl = new URL(route, `http://127.0.0.1:${httpPort}/${route}`);
  return axios.post(fullUrl.href, data);
}

function assertUtf8JsonResponse(response: AxiosResponse) {
  const expectedContentType = 'application/json; charset=utf-8';
  const actualContentType = response.headers['content-type'];
  assert(
    actualContentType,
    expectedContentType,
    `Expected response to be of content-type '${expectedContentType}', but was '${actualContentType}'.`
  );
}

export { getRequestToServer, postRequestToServer, assertUtf8JsonResponse };
