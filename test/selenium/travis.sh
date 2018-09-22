#!/bin/bash
set -eou pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

main() {
    S3_BASE="projects/rundeck/branch/${RUNDECK_BRANCH}/build/${RUNDECK_BUILD_NUMBER}/selenium-images"

    RET=0
    docker-compose run \
        -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
        -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
        selenium "npm install && ./bin/deck selenium -u http://rundeck:4440 -h --s3-upload --s3-base ${S3_BASE}" || RET=$?

    local DIFF_DIR=__image_snapshots__/__diff_output__

    if [[ -d "${DIFF_DIR}" ]] ; then
        aws s3 sync $DIFF_DIR s3://ci.rundeck.org/$S3_BASE/diff
    fi

    echo "Image output available at: http://ci.rundeck.com/$S3_BASE"

    sleep 1 # Give Travis a shot at capturing the log output

    exit $RET
}

(
    cd $DIR
    main
)