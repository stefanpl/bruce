#!/bin/bash
set -e

source $( dirname ${BASH_SOURCE[0]} )/utils.sh

containerId=`docker_find_container_id ${STACK_NAME}_nodeserver`

# First, kill any running test processes
set +e
docker exec --interactive --user node --workdir /home/node/app ${containerId} /bin/bash -c \
"pkill --full 9231"
set -e

docker exec --detach --interactive --user node --workdir /home/node/app ${containerId} /bin/bash -c \
"npm run test-debug"
