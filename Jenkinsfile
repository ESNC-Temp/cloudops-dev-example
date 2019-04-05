pipeline {
  agent {
    kubernetes {
      label 'xolvci'
    }
  }
  environment {
    CI = 'true' 
  }
  stages {
    stage('Build') {
      when {
        changeRequest()
      }
      steps {
        container('node') {
          sh 'npm install'
          sh 'npm test' 
        }
      }
    }
    stage('Audit') {
      when {
        changeRequest()
      }
      steps {
        echo 'Audited'
      }
    }
    stage('Release') {
      stages {
        stage('DEV') {
          when {
            changeRequest()
          }
          steps {
            echo "Starting build"
          }
        }
        stage('UAT') {
          when {
            changeRequest()
          }
          steps {
            echo "Starting build"
          }
        }
        stage('PROD') {
          when {
            changeRequest()
          }
          steps {
            echo "Starting build"
          }
        }
        stage('STAGE') {
          when {
            changeRequest()
          }
          steps {
            echo "Starting build"
          }
        }
      }
    }
  }
}
