#!/bin/bash

# This script must be called after each code update (i.e. a git pull).
# Installs packages & compiles code

scriptDirectory=$( dirname ${BASH_SOURCE[0]} )
source ${scriptDirectory}/utils.sh
pushd ${scriptDirectory}/../ > /dev/null
trap "popd > /dev/null" EXIT

source .env

runCommandOnNodeContainer "npm install && npm run ${NPM_COMPILE_COMMAND}"
