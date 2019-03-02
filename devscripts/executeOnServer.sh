#!/bin/bash
set -e

source $( dirname ${BASH_SOURCE[0]} )/utils.sh
source ${BASH_UTILS_LOCATION}/logError.sh

if [ -z "${1}" ]; then
  logError "Provide a command as the first parameter."
  exit 1
fi

runCommandOnRunningNodeContainer ${*}