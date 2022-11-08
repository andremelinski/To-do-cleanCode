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