pipeline {
    agent any

    stages {
        stage('Git Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Compose Down') {
            steps {
                sh '''
                docker compose down || true
                '''
            }
        }

        stage('Docker Compose Build') {
            steps {
                sh '''
                docker compose build --no-cache
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker compose up -d
                '''
            }
        }

        stage('Django Migration') {
            steps {
                sh '''
                docker compose exec -T backend python manage.py makemigrations
                docker compose exec -T backend python manage.py migrate
                '''
            }
        }

        stage('Check Container') {
            steps {
                sh '''
                docker compose ps
                docker ps
                '''
            }
        }
    }

    post {
        success {
            echo '================================='
            echo 'React + Django + PostgreSQL + Nginx Deployment Success'
            echo '================================='
        }

        failure {
            echo '================================='
            echo 'Deployment Failed'
            echo '================================='
        }
    }
}