#!/bin/bash
set -e

scriptDirectory=$( dirname ${BASH_SOURCE[0]} )
BASH_UTILS_LOCATION=${scriptDirectory}/../node_modules/bash-utils/utils
source ${BASH_UTILS_LOCATION}/docker/removeDockerStack.sh
source ${scriptDirectory}/../docker/.env.docker

removeDockerStack ${STACK_NAME}
