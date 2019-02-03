#!/bin/bash
set -e 

# This scripts sets up the project after is has initially been cloned

scriptDirectory=$( dirname ${BASH_SOURCE[0]} )
pushd ${scriptDirectory}/../ > /dev/null
trap cleanup EXIT
function cleanup() {
  popd > /dev/null
  if [ ! -z "$tmpDir" ] && [ -d "$tmpDir" ]; then
    rm -r ${tmpDir}
  fi
} 

git --version > /dev/null 2>&1 || echo "git could not be found, but is required to run this script."

# Clone bash-utils and source required functions
tmpDir=`mktemp -d`
git clone --quiet ~/webdev/bash-utils ${tmpDir}
BASH_UTILS_LOCATION=${tmpDir}/utils
source "${BASH_UTILS_LOCATION}/initializeRethinkDataDirectory.sh"
source "${BASH_UTILS_LOCATION}/copyExampleFile.sh"

# Set up docker
copyExampleFile "./docker/.env.docker.example"
initializeRethinkDataDirectory "./docker/docker-volumes/rethinkdb-data/"

source ${scriptDirectory}/start.sh
