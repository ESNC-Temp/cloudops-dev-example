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
    stage('Release') {
      parallel {
        stage('Echo') {
          steps {
            echo "Starting build"
          }
        }
        stage('Verify') {
          agent {
            kubernetes {
              label 'xolvci'
              defaultContainer 'jnlp-slave'
            }
          }
          when {
            beforeAgent true
            beforeInput true
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
      }
    }
  }
}
