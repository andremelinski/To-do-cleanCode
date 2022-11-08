#!/bin/bash

die () {
    echo >&2 "$@"
    exit 1
}

# check for arguments or die
[[ "$#" -ge 1 ]] || die "Please provide library function and arguments!"

EXECUTABLE_DIR=$( dirname "${BASH_SOURCE[0]}")

# source library
if [[ -e ${EXECUTABLE_DIR}/generic_functions.sh ]]; then
    . ${EXECUTABLE_DIR}/generic_functions.sh
else 
    echo "Shell library not found!"
    exit
fi

cmd="${1}"
shift

"${cmd}" "${@}"
