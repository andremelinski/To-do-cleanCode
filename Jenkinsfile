pipeline {
    agent any
    tools {
        dockerTool 'docker'
        nodejs 'node:16-alpine'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test-coverage'
            }
        }
    }
    post {
        always {
            sh 'ls **/coverage/coverage-test'
            junit '**/coverage/coverage-test/*.xml'
        }
        failure {
            echo 'fail'
        }
    }
}