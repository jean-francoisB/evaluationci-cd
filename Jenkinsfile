pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock' 
        }
    }

    environment {
        DB_HOST = "mysql_db"
        DB_USER = "appuser"
        DB_PASSWORD = "password"
        DB_NAME = "mydatabase"
        APP_PORT = "3000"
    }

    stages {
        stage('Checkout Code') {
            steps {
                cleanWs()
                git branch: 'main', url: 'https://github.com/jean-francoisB/evaluationci-cd.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                withEnv([
                    "DB_HOST=${env.DB_HOST}",
                    "DB_USER=${env.DB_USER}",
                    "DB_PASSWORD=${env.DB_PASSWORD}",
                    "DB_NAME=${env.DB_NAME}"
                ]) {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-node-api:latest -f Dockerfile .'
            }
        }

        stage('Deploy Application') {
            steps {
                sh "docker compose -f docker-compose.prod.yml down --remove-orphans || true"
                withEnv([
                    "DB_HOST=${env.DB_HOST}",
                    "DB_USER=${env.DB_USER}",
                    "DB_PASSWORD=${env.DB_PASSWORD}",
                    "DB_NAME=${env.DB_NAME}",
                    "APP_PORT=${env.APP_PORT}"
                ]) {
                    sh "docker compose -f docker-compose.prod.yml up -d --build"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Pipeline réussi !'
        }
        failure {
            echo 'Pipeline échoué !'
        }
    }
}
