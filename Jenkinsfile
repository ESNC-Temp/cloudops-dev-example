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
    stage('Verify') {
      agent {
        kubernetes {
          label 'xolvci'
          defaultContainer 'jnlp-slave'
        }
      }
      when {
        changeRequest()
      }
      options {
        retry(1)
        timeout(time: 1, unit: 'HOURS')
      }
      input {
        message 'Deploy to  UAT?'
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
