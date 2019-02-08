#!/bin/bash
set -e

scriptDirectory=$( dirname ${BASH_SOURCE[0]} )
BASH_UTILS_LOCATION=${scriptDirectory}/../node_modules/bash-utils/utils
source ${BASH_UTILS_LOCATION}/logError.sh

if [ -z "${1}" ]; then
  logError "Provide a command as the first parameter."
  exit 1
fi

source ${scriptDirectory}/utils.sh

runCommandOnNodeContainer ${*}