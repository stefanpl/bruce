#!/bin/bash
set -e

# This script must be called after each code update (i.e. a git pull).
# Installs packages & compiles code

source $( dirname ${BASH_SOURCE[0]} )/utils.sh

runCommandOnNewNodeContainer "npm install && npm run ${NPM_COMPILE_COMMAND}"
