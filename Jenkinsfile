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
      input {
        message 'Deploy to  UAT?', 
        ok 'Deploy'
      }
      steps {
        echo 'Whale helllllllllo!'
      }
    }
    stage('Build') {
      steps {
        container('node') {
          sh 'npm install'
          sh 'npm test' 
        }
      }
    }
    stage('Audit') {
      steps {
        container('node') {
          sh 'npm audit' 
        }
      }
    }
  }
}
