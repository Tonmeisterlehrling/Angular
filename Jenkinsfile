pipeline {
  agent any

  environment {
    NETLIFY_SITE_ID = '01b3bfd5-16cc-47e4-a0ad-e66e0e8b78c7'
    NETLIFY_AUTH_TOKEN = credentials('netlify-token')
  }

  stages {
    stage('Build') {
      agent {
        docker {
          image 'node:20-alpine'
          reuseNode true
        }
      }
      steps {
        sh '''
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la
                '''
      }
    }

    stage('Run Tests') {
      parallel {
        stage('Unit Tests') {
          agent {
            docker {
              image 'node:18-alpine'
              reuseNode true
            }
          }
          steps {
            sh '''
                            echo test stage
                            test -f build/index.html
                            npm test
                        '''
          }
          post {
            always {
              junit 'jest-results/junit.xml'
            }
          }
        }

        stage('E2E') {
          agent {
            docker {
              image 'mcr.microsoft.com/playwright:v1.39.0-jammy'
              reuseNode true
            }
          }
          steps {
            sh '''
                            npm install serve
                            node_modules/.bin/serve -s build &
                            sleep 10
                            npx playwright test --reporter=html
                        '''
          }
          post {
            always {
              publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright Local', reportTitles: '', useWrapperFileDirectly: true])
            }
          }
        }
      }
    }

    stage('Deploy Staging') {
      agent {
        docker {
          image 'node:18-alpine'
          reuseNode true
        }
      }
      steps {
        sh '''
                    npm install netlify-cli node-jq
                    node_modules/.bin/netlify deploy --dir=build --json > deploy-output.json
                    node_modules/.bin/node-jp -r '.deploy_url' deploy-output.json
                '''
      }
    }

    stage('Approval') {
      steps {
        timeout(1) {
          input message: 'Do you wish to deploy to production?', ok: 'Yes, I am sure!'
        }
      }
    }

    stage('Deploy prod') {
      agent {
        docker {
          image 'node:18-alpine'
          reuseNode true
        }
      }
      steps {
        sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify deploy --dir=build --prod
                '''
      }
    }

    stage('Prod E2E') {
      agent {
        docker {
          image 'mcr.microsoft.com/playwright:v1.39.0-jammy'
          reuseNode true
        }
      }

      environment {
        CI_ENVIRONMENT_URL = 'https://peppy-puppy-c33000.netlify.app'
      }

      steps {
        sh '''

                    npx playwright test --reporter=html
                '''
      }
      post {
        always {
          publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright E2E', reportTitles: '', useWrapperFileDirectly: true])
        }
      }
    }
  }
}
