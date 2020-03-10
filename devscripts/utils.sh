#!/bin/bash
set -e

# This file exports common variables, especially those from .env and .env.docker.
# It also provides common functions for other scripts to use.

if [ -z "$BASH_SOURCE[0]" ]; then
  export SCRIPT_DIRECTORY=`dirname "$(readlink -f "$0")"`
else
  export SCRIPT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
fi
if [ -z "$BASH_UTILS_LOCATION" ]; then
  export BASH_UTILS_LOCATION=${SCRIPT_DIRECTORY}/../node_modules/bash-utils/utils
fi

if [ ! -d "$BASH_UTILS_LOCATION" ]; then
  echo "Could not locate bash-utils inside node_modules folder. Have you already called setup.sh?" > /dev/stderr 
  exit 1
fi

source ${BASH_UTILS_LOCATION}/bootstrap.sh

exportVariablesFromFile ${SCRIPT_DIRECTORY}/../.env
exportVariablesFromFile ${SCRIPT_DIRECTORY}/../docker/.env.docker


function runCommandOnNewNodeContainer() {
  if [ -z "${1}" ]; then
    logError "Provide a command as the first parameter."
    return 1
  fi

  absolutePathToCode=`cd ${SCRIPT_DIRECTORY}/../ && pwd`
  workdir=/home/node/app

  docker run --user node --interactive --tty --workdir ${workdir} \
  --mount type=bind,src=${absolutePathToCode},dst=${workdir} \
  "keymetrics/pm2:8-stretch" /bin/bash -c "${*}"
}

function runCommandOnRunningNodeContainer() {
  if [ -z "${1}" ]; then
    logError "Provide a command as the first parameter."
    return 1
  fi

  containerId=`docker_find_container_id ${STACK_NAME}_nodeserver`

  docker exec --interactive --tty --user node --workdir /home/node/app \
   ${containerId} /bin/bash -c "${*}"
}
