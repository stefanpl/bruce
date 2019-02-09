#!/bin/bash
set -e

scriptDirectory=$( dirname ${BASH_SOURCE[0]} )
BASH_UTILS_LOCATION=${scriptDirectory}/../node_modules/bash-utils/utils
source ${BASH_UTILS_LOCATION}/docker/docker_find_container_id.sh

containerId=`docker_find_container_id ${STACK_NAME}_nodeserver`

docker exec --detach --interactive --user node --workdir /home/node/app ${containerId} /bin/bash -c \
"npm run test-debug"