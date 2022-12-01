#!/bin/bash

container_exec_sh_command(){
    local stack_name=$1
    shift
    local container=$2
    shift
    local cmd="${@}"
    if [[ "${cmd}" && "${stack_name}" && "${container}" ]]; then
    # -p -> project-name; -T -> Disable pseudo-TTY
        docker-compose -p ${stack_name} exec -T ${container} sh -c "${cmd}"
    else
        echo "Missing command or container in container_run_command!"
    fi
}

envSet(){
    local SOURCE_BRANCH=$1
    local FILE_DIR=$( dirname "${BASH_SOURCE[0]}")
    case ${SOURCE_BRANCH} in
        "master")
            echo "${SOURCE_BRANCH}.sh"
            sh "chmod +x ${FILE_DIR}/create_env.sh" 
            echo "create_env"
            sh -c "${FILE_DIR}/create_env.sh ${FILE_DIR}/env/env-${SOURCE_BRANCH}.sh"
            ;;
        *)
            echo "Not a valid argument"
            sh "create_env.sh env/env-dev.sh"
            ;;
    esac
}