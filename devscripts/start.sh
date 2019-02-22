#!/bin/bash
set -e

# This script starts the docker stack once it has been set up.
# It can be called with an --update-first flag to do a code update prior to starting the stack.

source $( dirname ${BASH_SOURCE[0]} )/utils.sh
source ${BASH_UTILS_LOCATION}/docker/setDockerHostIp.sh
source ${BASH_UTILS_LOCATION}/logInfo.sh
source ${BASH_UTILS_LOCATION}/exportVariablesFromFile.sh


if [ ! -z "${1}" ]; then
  if [ "${1}" = "--update-first" ]; then
    source ${SCRIPT_DIRECTORY}/update.sh
  else 
    logInfo "Ignoring unrecognized parameter to start.sh script: ${1}"
  fi
fi

setDockerHostIp
exportVariablesFromFile ${SCRIPT_DIRECTORY}/../docker/.env.docker
exportVariablesFromFile ${SCRIPT_DIRECTORY}/../.env

docker stack deploy -c ${SCRIPT_DIRECTORY}/../docker/docker-compose.yml ${STACK_NAME}
