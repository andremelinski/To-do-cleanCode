pipeline {
    agent any
      environment {
        NODE_CONTAINER_NAME = "ts-node"
        DB_CONTAINER_NAME = "tasks-db"
        COMPOSE_STACK_NAME = "todo-clancode"
        CALL_SCRIPT = "${WORKSPACE}/jenkins_functions/call.sh"
        NODE_VERSION = "v12.22.10"
    }
    tools {
        dockerTool 'docker'
        nodejs 'node:16-alpine'
    }
    stages {
        // stage('Build') {
        //     steps {
        //         sh 'npm install'
        //     }
        // }
        stage('Unit Test') {
            steps {
                retry(count: 3) {
                    unitTestNodeApp()
                }
                // sh 'npm run test-coverage'
            }
        }
    }
    post {
        always {
            junit allowEmptyResults: true, testResults: 'coverage/coverage-test/cobertura-coverage.xml'
            step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/coverage-test/cobertura-coverage.xml'])
            cleanWs() //cleanup workspace
        }
        failure {
            echo 'fail'
        }
    }
};

def unitTestNodeApp() {
    // sh "docker exec -it ts-node /bin/sh"
    // sh "docker exec -it tasks-db bash"
    sh "${CALL_SCRIPT} container_exec_sh_command ${COMPOSE_STACK_NAME} ${NODE_CONTAINER_NAME} 'rm -rf /node_modules/'"
    sh "${CALL_SCRIPT} container_exec_sh_command ${COMPOSE_STACK_NAME} ${NODE_CONTAINER_NAME} 'npm i nyc'"
    sh "sleep 60"
    sh "docker network disconnect -f ${COMPOSE_STACK_NAME}_default ${NODE_CONTAINER_NAME}"
    sh "${CALL_SCRIPT} container_exec_sh_command ${COMPOSE_STACK_NAME} ${NODE_CONTAINER_NAME} 'npm run test-coverage'"
    // sh "${CALL_SCRIPT} container_exec_sh_command ${COMPOSE_STACK_NAME} ${NODE_CONTAINER_NAME} 'rm -rf \${local_dir}'"
}