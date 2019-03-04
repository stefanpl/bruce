const cloneDeep = require('lodash/cloneDeep');
require('dotenv-safe').config();

let template = {
  name      : 'bruce',
  script    : './dist/app.compiled.js',
};

/**
 * @param {string} identifier – will be set as NODE_ENV
 * @returns object
 */
function createInstance(identifier) {
  let instanceObject = cloneDeep(template);
  instanceObject.name += `-${identifier}`;
  instanceObject.env = {
    'NODE_ENV': identifier,
  }
  return instanceObject;
}

let devInstance = createInstance('development');
devInstance.node_args = ["--inspect=0.0.0.0:9230"];

let testInstance = createInstance('test');

let liveInstance = createInstance('production');

module.exports = {
  apps: [devInstance, testInstance, liveInstance]
};
