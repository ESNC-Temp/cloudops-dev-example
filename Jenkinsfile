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
    stage('Release') {
      stages {
        stage('DEV') {
          when {
            beforeAgent true
            beforeInput true
            branch 'develop'
          }
          input {
            message 'Approved for DEV release?'
            ok 'Deploy'
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
          input {
            message 'Approved for UAT release?'
            ok 'Deploy'
          }
          steps {
            echo 'releasing'
          }
        }
      }
    }
  }
}
