pipeline {
    agent {
        docker {
            image 'selenium/node-chrome' 
        }
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
}