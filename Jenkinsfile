pipeline {
  agent {
    kubernetes {
      label 'xolvci'
      defaultContainer 'node'
    }
  }
  environment {
    CI = 'true'
    ATLAS_TOKEN = credentials('tfe_token')
    TF_VAR_tfe_token = credentials('tfe_token')
  }
  stages {
    stage('Initialize') {
      steps {
        echo 'Upgrading Yarn'
      }
    }
    stage('Build') {
      when {
        changeRequest()
      }
      steps {
        echo "Building"
      }
    }
    stage('Validate') {
      when {
        changeRequest()
      }
      parallel {
        stage('Audit') {
          steps {
            echo 'Audit'
          }
        }
        stage('Lint') {
          steps {
            echo 'Lint'
          }
        }
        stage('Terraform') {
          steps {
            echo 'TF check'
          }
        }
      }
    }
    stage('Test') {
      when {
        changeRequest()
      }
      parallel {
        stage('frontend') {
          steps {
            echo 'testing'
          }
        }
        stage('api') {
          steps {
            echo 'testing'
          }
        }
      }
    }
    stage('Validate Docker') {
      when {
        changeRequest()
      }
      steps {
        echo 'validating'
      }
    }
    stage('Release') {
      stages {
        stage('DEV') {
          when {
            beforeAgent true
            beforeInput true
            branch 'develop'
          }
          options {
            retry(1)
            timeout(time: 1, unit: 'HOURS')
          }
          steps {
            echo 'releasing'
          }
        }
        stage('UAT') {
          when {
            beforeAgent true
            beforeInput true
            // NOTE: the `\\` is an escape for valid groovy syntax
            // Example: uat/1.0.0+103
            tag pattern: "^(?:uat)\\/((?:\\d+)\\.(?:\\d+)\\.(?:\\d+)\\+(?:\\d+))", comparator: "REGEXP"
          }
          options {
            retry(1)
            timeout(time: 1, unit: 'HOURS')
          }
          input {
            message 'Approved for UAT release?'
            ok 'Deploy'
          }
          steps {
            echo 'releasing'
          }
        }
        stage('PROD') {
          when {
            beforeAgent true
            beforeInput true
            branch "master"
          }
          options {
            retry(1)
            timeout(time: 1, unit: 'HOURS')
          }
          input {
            message 'Approved for PROD release?'
            ok 'Deploy'
          }
          steps {
            echo 'releasing'
          }
        }
        stage('SUPPORT') {
          options {
            retry(1)
            timeout(time: 1, unit: 'HOURS')
          }
          when {
            beforeAgent true
            beforeInput true
            branch "master"
          }
          input {
            message 'Approved for SUPPORT release?'
            ok 'Deploy'
          }
          steps {
            echo 'support'
          }
        }
      }
    }
  }
}
