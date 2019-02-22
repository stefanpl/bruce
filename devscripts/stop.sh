#!/bin/bash
set -e

source $( dirname ${BASH_SOURCE[0]} )/utils.sh
source ${BASH_UTILS_LOCATION}/docker/removeDockerStack.sh

removeDockerStack ${STACK_NAME}
