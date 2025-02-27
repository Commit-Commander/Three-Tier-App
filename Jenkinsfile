pipeline {

    agent { label "dev" }

    stages {
        stage("Clone") {
            steps {
                git url: "https://github.com/Commit-Commander/Three-Tier-Application", branch: "main"
            }
        }
        stage("Build") {
            steps {
                sh "docker build -t backend-app ./backend/Dockerfile && docker build -t frontend-app ./frontend/Dockerfile"
            }
        }
        stage("Push") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "dockerHubCreds",
                    usernameVariable: "dockerHubUsername",
                    passwordVariable: "dockerHubPassword"
                )]) {
                    sh "docker login -u ${dockerHubUsername} -p ${dockerHubPassword}"
                    sh "docker image tag backend-app ${dockerHubUsername}/backend-app && docker image tag frontend-app ${dockerHubUsername}/frontend-app"
                    sh "docker push ${dockerHubUsername}/backend-app && docker push ${dockerHubUsername}/frontend-app"
                }
            }
        }
        stage("Prepare Env File for Deployment") {
            steps {
                withCredentials([file(
                    credentialsId: 'three_tier_env_file_credentials', 
                    variable: 'ENV_FILE'
                )]) {
                    sh "rm -r .env && cp ${env.ENV_FILE} .env"
                }
            }
        }
        stage("Deploy") {
            steps {
                sh "docker compose up -d"
            }
        }
        stage("Clean Up") {
            steps {
                sh "docker system prune -f"
            }
        }
    }

    post {
        success {
            script {
                emailext from: "kartikeynarayan9598@gmail.com",
                    to: "kartikey.narayan@inc.in",
                    subject: "Jenkins Action",
                    body: "The Jenkins pipeline has completed successfully. 🚀"
            }
        }
        failure {
            script {
                emailext from: "kartikeynarayan9598@gmail.com",
                    to: "kartikey.narayan@inc.in",
                    subject: "Jenkins Action",
                    body: "The Jenkins pipeline has failed. ❌"
            }
        }
    }
}