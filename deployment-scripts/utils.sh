#!/bin/bash

function runCommandOnNodeContainer() {
  if [ -z "${1}" ]; then
    logError "Provide a command as the first parameter."
    return 1
  fi

  scriptDirectory=$( dirname ${BASH_SOURCE[0]} )
  pushd ${scriptDirectory}/../ > /dev/null
  trap "popd > /dev/null 2>&1" EXIT RETURN

  absolutePathToCode=`pwd`
  workdir=/home/node/app

  docker run --user node --mount type=bind,src=${absolutePathToCode},dst=${workdir} --workdir ${workdir} "keymetrics/pm2:8-stretch" \
    /bin/bash -c "${*}"
}
