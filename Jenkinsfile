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
    stage('Initialize') {
      steps {
        rtServer (
            id: REGISTRY_NAME,
            url: JFROG_DOMAIN
        )
      }
    }
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
    stage('Docker') {
      when {
        branch 'PR-26'
      }
      steps {
        script {
          docker.build(ARTIFACTORY_DOCKER_REGISTRY + "/$IMAGE_NAME:$GIT_COMMIT", '.')
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
        rtDockerPush(
            serverId: REGISTRY_NAME,
            image: ARTIFACTORY_DOCKER_REGISTRY + "/$IMAGE_NAME:$GIT_COMMIT",
            targetRepo: 'docker-local',
            // Attach custom properties to the published artifacts:
            properties: "project-name=$IMAGE_NAME;status=pre-release"
        )
        
        rtPublishBuildInfo (
            serverId: REGISTRY_NAME
        )
      }
    }
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
