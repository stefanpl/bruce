#!/bin/bash
set -e

# This script starts the docker stack once it has been set up.
# It can be called with an --update-first flag to do a code update prior to starting the stack.

scriptDirectory=$( dirname ${BASH_SOURCE[0]} )
BASH_UTILS_LOCATION=${scriptDirectory}/../node_modules/bash-utils/utils
source "${BASH_UTILS_LOCATION}/copyExampleFile.sh"
source "${BASH_UTILS_LOCATION}/docker/setDockerHostIp.sh"
source "${BASH_UTILS_LOCATION}/logInfo.sh"

# copyExampleFile ${scriptDirectory}/../.env.example
source ${scriptDirectory}/../.env

if [ ! -z "${1}" ]; then
  if [ "${1}" = "--update-first" ]; then
    source ${scriptDirectory}/update.sh
  else 
    logInfo "Ignoring unrecognized parameter to start.sh script: ${1}"
  fi
fi

source ${scriptDirectory}/../docker/.env.docker

export DOCKER_HOST_IP=${DOCKER_HOST_IP}
export RETHINK_ADMIN_PORT=${RETHINK_ADMIN_PORT}
export RETHINK_DB_PORT=${RETHINK_DB_PORT}
export HTTP_PORT=${HTTP_PORT}
export SERVER_DEBUG_PORT=${SERVER_DEBUG_PORT}
export TESTS_DEBUG_PORT=${TESTS_DEBUG_PORT}

docker stack deploy -c ${scriptDirectory}/../docker/docker-compose.yml ${STACK_NAME}
