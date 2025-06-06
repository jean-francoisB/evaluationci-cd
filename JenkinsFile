
pipeline {
    agent any

    environment {
        DB_HOST = "mysql_db" 
        DB_USER = "appuser"
        DB_PASSWORD = "password" 
        DB_NAME = "mydatabase"
        APP_PORT = "3000" 
    }

    stages {
        // Étape 1: Checkout du Code Source
        stage('Checkout Code') {
            steps {

                cleanWs()

                git branch: 'main', url: 'https://github.com/jean-francoisB/evaluationci-cd.git'
            }
        }

        // Étape 2: Installation des Dépendances Node.js
        stage('Install Dependencies') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh 'npm install'
                    }
                }
            }
        }

        // Étape 3: Exécution des Tests Unitaires
        stage('Run Tests') {
            steps {
                script {
                    docker.image('node:18').inside {
                        withEnv(["DB_HOST=${env.DB_HOST}", "DB_USER=${env.DB_USER}", "DB_PASSWORD=${env.DB_PASSWORD}", "DB_NAME=${env.DB_NAME}"]) {
                            sh 'npm test'
                        }
                    }
                }
            }
        }

        // Étape 4: Build et Packaging (Création de l'Image Docker de l'Application)
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("devops-node-api:latest", "-f Dockerfile .")
                }
            }
        }

        // Étape 5: Déploiement (via Docker Compose)
        stage('Deploy Application') {
            steps {
                script {
                    sh "docker compose -f docker-compose.prod.yml down --remove-orphans || true"

                    withEnv(["DB_HOST=${env.DB_HOST}", "DB_USER=${env.DB_USER}", "DB_PASSWORD=${env.DB_PASSWORD}", "DB_NAME=${env.DB_NAME}", "APP_PORT=${env.APP_PORT}"]) {
                        sh "docker compose -f docker-compose.prod.yml up -d --build"
                    }

                    echo "Application déployée. Accédez à http://localhost:${APP_PORT}"
                }
            }
        }
    }

    // Section post-build (notifications, nettoyage, etc.)
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