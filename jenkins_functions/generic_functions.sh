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
    echo SOURCE_BRANCH
    case SOURCE_BRANCH in
        "master")
            sh "jenkins_functions/create_env.sh env-${SOURCE_BRANCH}.sh"
            ;;
        *)
            echo "Not a valid argument"
            sh "app-node/create_env.sh env-dev.sh"
            ;;
    esac
}