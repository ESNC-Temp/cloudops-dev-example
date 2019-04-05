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
      stage('Echo') {
        when {
          changeRequest()
        }
        steps {
          echo "Starting build"
        }
      }
      stage('Verify') {
        when {
          beforeAgent true
          beforeInput true

          // Example: uat/1.0.0+103
          tag pattern: "^(?:uat)\\/((?:\\d+)\\.(?:\\d+)\\.(?:\\d+)\\+(?:\\d+))", comparator: "REGEXP"
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
