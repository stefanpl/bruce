#!/bin/bash
set -e

source $( dirname ${BASH_SOURCE[0]} )/utils.sh

runCommandOnRunningNodeContainer "npm run test-debug"
