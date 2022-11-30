#!/usr/bin/env bash
set -e

die () {
    echo >&2 "$@"
    exit 1
}

[[ "$#" -eq 1 ]] || die "Please provide the env.sh filename as the first argument"
[[ -f "$1" ]] || die "File $1 does not exist"

echo "Using $1 for the env file"
. "${1}"

FILE_DIR=$( dirname "${BASH_SOURCE[0]}")
cd "${FILE_DIR}/env"
envsubst < env.template > .env
cd -

SCRIPT=$(basename "${0}")
echo "Successfully created .env file"
