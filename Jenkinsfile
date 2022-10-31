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
            // junit '**/coverage/coverage-test/*.xml'
            step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/coverage-test/cobertura-coverage.xml'])
        }
        failure {
            echo 'fail'
        }
    }
}