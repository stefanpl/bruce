#!/bin/bash
set -e 

# This scripts sets up the project after is has initially been cloned

scriptDirectory=$( dirname ${BASH_SOURCE[0]} )
trap cleanup EXIT
function cleanup() {
  if [ ! -z "$tmpDirForBashUtils" ] && [ -d "$tmpDirForBashUtils" ]; then
    rm -rf ${tmpDirForBashUtils}
  fi
} 

git --version > /dev/null 2>&1 || echo "git could not be found, but is required to run this script."

# Clone bash-utils and source required functions
tmpDirForBashUtils=`mktemp -d`
git clone --quiet https://github.com/stefanpl/bash-utils ${tmpDirForBashUtils}
export BASH_UTILS_LOCATION=${tmpDirForBashUtils}/utils
source "${BASH_UTILS_LOCATION}/initializeRethinkDataDirectory.sh"
source "${BASH_UTILS_LOCATION}/copyExampleFile.sh"


# Set up docker
copyExampleFile "./docker/.env.docker.example"
copyExampleFile "./.env.example"
initializeRethinkDataDirectory "./docker/docker-volumes/rethinkdb-data/"

source ${scriptDirectory}/update.sh
source ${scriptDirectory}/start.sh
