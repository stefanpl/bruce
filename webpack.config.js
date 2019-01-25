const path = require('path');
const PostCompile = require('post-compile-webpack-plugin');
const cp = require('child_process');
const pm2Configs = require('./pm2.config');
const _find = require('lodash.find');

/**
 * This function is executed after each compilation
 *
 */
function postCompileCallback () {
  let activeAppConfig = findActivePm2Config();
  // Issuing a simple `pm2 restart` will lose the node_args configuration setup in pm2.config.js
  // Avoid this by restarting via delete & start
  let command = `pm2 delete ${activeAppConfig.name} ; pm2-runtime pm2.config.js --only ${activeAppConfig.name}`;

  let child = cp.spawn(command, [], { detached: true, shell: true });
  child.unref();

  function findActivePm2Config() {
    let pm2Suffix = 'dev';
    if (process.env.NODE_ENV === 'production') {
      pm2Suffix = 'live';
    }
    let matchingConfig;
    matchingConfig = _find(pm2Configs.apps, function checkForName(appConfig) {
      let serverNameRegex = pm2Suffix+'$';
      return appConfig.name.match(new RegExp(serverNameRegex));
    });
    if ( ! matchingConfig) {
      throw new Error(`Could not find a matching app config.`);
    }
    return matchingConfig;
  }
}


module.exports = {
  entry: {
    app: './src/app.ts',
    tests: './test/_testSuite.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].compiled.js'
  },
  // Do not replace process.env['NODE_ENV'] at compile time!
  optimization: {
    nodeEnv: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new PostCompile(postCompileCallback)
  ],
  target: 'node',
  devtool: "inline-source-map",
};