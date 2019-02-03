#!/bin/bash

# This script starts the docker stack once it has been set up.
# It can be called with an --update-first flag to do a code update prior to starting the stack.

scriptDirectory=$( dirname ${BASH_SOURCE[0]} )
BASH_UTILS_LOCATION=${scriptDirectory}/../node_modules/bash-utils/utils

if [ ! -z "${1}" ]; then
  if [ "${1}" = "--update-first" ]; then;
    source ${scriptDirectory}/update.sh
  else 
    echo "Ignoring nrecognized parameter to start.sh script: ${1}" > /dev/stderr
  fi
fi



source "${BASH_UTILS_LOCATION}/copyExampleFile.sh"