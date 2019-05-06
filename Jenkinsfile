pipeline {
  agent {
    kubernetes {
      label 'xolvci'
    }
  }
  environment {
    CI = 'true'
    IMAGE_NAME = 'cloudops-dev-example'
    JFROG_DOMAIN = 'docker.registry.prod.xolv.app'
    REGISTRY_NAME = 'jfrog'
  }
  stages {
    stage('Build') {
      when {
        changeRequest()
      }
      steps {
        container('node') {
          sh 'yarn'
        }
      }
    }
    stage('Audit') {
      when {
        changeRequest()
      }
      steps {
        container('node') {
          sh 'yarn audit'
        }
      }
    }
    stage('Push DEV') {
      when {
        beforeAgent true
        beforeInput true
        branch 'PR-26'
      }
      steps {
        container('jnlp-slave') {
          sh 'yarn docker:build'
          publishImage(GIT_COMMIT)
        }
      }
    }
    // stage('Promote to UAT') {
    //   when {
    //     beforeAgent true
    //     beforeInput true
    //     branch 'PR-26'

    //     // Example: uat/1.0.0+103
    //     // tag pattern: "^(?:uat)\\/((?:\\d+)\\.(?:\\d+)\\.(?:\\d+)\\+(?:\\d+))", comparator: "REGEXP"
    //   }
    //   input {
    //     message 'Deploy to  UAT?'
    //     ok 'Deploy'
    //   }
    //   steps {
    //     echo 'Promote to UAT'
    //     addInteractivePromotion('dev', 'uat')
    //   }
    // }
  }
}

def addInteractivePromotion(sourceStage, targetStage) {
  rtAddInteractivePromotion(
    copy: true,
    failFast: true,
    includeDependencies: true,
    serverId: REGISTRY_NAME,
    sourceRepo: sourceStage == "dev" ? "docker-local" : "docker-${sourceStage}-local",
    status: 'Released',
    targetRepo: "docker-${targetStage}-local"
  )
}

def publishImage(String tag) {
  sh "docker tag ${IMAGE_NAME}:latest ${JFROG_DOMAIN}/${IMAGE_NAME}:${tag}"

  script {
    def server = Artifactory.server REGISTRY_NAME
    def rtDocker = Artifactory.docker server: server
    def buildInfo = rtDocker.push "${JFROG_DOMAIN}/${IMAGE_NAME}:${tag}", 'docker'
    server.publishBuildInfo buildInfo
    addInteractivePromotion('dev', 'uat')

    def xrayConfig = [
      'buildName'     : env.JOB_NAME,
      'buildNumber'   : env.BUILD_NUMBER,
      'failBuild'     : false
    ]
    def xrayResults = server.xrayScan xrayConfig
    echo xrayResults as String
  }
}
