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
      when {
        beforeAgent true
        beforeInput true
        anyOf {
          branch "feature/jenkins-when-tests"
          // Example: uat/1.0.0+103
          tag pattern: "^(?:uat)\\/((?:\\d+)\\.(?:\\d+)\\.(?:\\d+)\\+(?:\\d+))", comparator: "REGEXP"
        }
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
