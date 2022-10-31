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
                sh 'npm test'
            }
        }
    }
    post {
        always {
            junit '**/coverage/*.xml'
        }
        failure {
            echo 'fail'
        }
    }
}