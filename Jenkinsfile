pipeline {
  agent {
    kubernetes {
      label 'xolvci'
    }
  }
  environment {
    CI = 'true'
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
          sh 'yarn test'
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
        branch 'feature/DEVOPS-483-image-promotion-example'
      }
      steps {
        container('jnlp-slave') {
          sh 'yarn docker:build'
          publishImage('cloudops-dev-example', GIT_COMMIT)
        }
      }
    }
    stage('Promote to UAT') {
      when {
        beforeAgent true
        beforeInput true

        // Example: uat/1.0.0+103
        tag pattern: "^(?:uat)\\/((?:\\d+)\\.(?:\\d+)\\.(?:\\d+)\\+(?:\\d+))", comparator: "REGEXP"
      }
      input {
        message 'Deploy to  UAT?'
        ok 'Deploy'
      }
      steps {
        echo 'Promote to UAT'
        promote('cloudops-dev-example', 'dev', 'uat')
      }
    }
  }
}

def promote(imageName, sourceStage, targetStage) {
  rtPromote(
    // Mandatory parameter
    buildName: imageName,
    buildNumber: GIT_COMMIT,
    // Artifactory server ID from Jenkins configuration, or from configuration in the pipeline script
    serverId: REGISTRY_NAME,
    // Name of target repository in Artifactory
    targetRepo: "docker-${targetStage}-local",

    // Optional parameters

    // Comment and Status to be displayed in the Build History tab in Artifactory
    comment: "${GIT_BRANCH} - ${GIT_COMMITTER_NAME}",
    status: 'Released',
    // Specifies the source repository for build artifacts.
    sourceRepo: "docker-${sourceStage}-local",
    // Indicates whether to promote the build dependencies, in addition to the artifacts. False by default.
    includeDependencies: true,
    // Indicates whether to fail the promotion process in case of failing to move or copy one of the files. False by default
    failFast: true,
    // Indicates whether to copy the files. Move is the default.
    copy: true
  )

  script {
    def server = Artifactory.server REGISTRY_NAME
    def rtDocker = Artifactory.docker server: server
    def buildInfo = rtDocker.push "${JFROG_DOMAIN}/${image}:${tag}", 'docker'
    server.publishBuildInfo buildInfo
  }
}

def publishImage(String image, String tag) {
  sh "docker tag ${image}:latest ${JFROG_DOMAIN}/${image}:${tag}"

  script {
    def server = Artifactory.server REGISTRY_NAME
    def rtDocker = Artifactory.docker server: server
    def buildInfo = rtDocker.push "${JFROG_DOMAIN}/${image}:${tag}", 'docker'
    server.publishBuildInfo buildInfo
  }
}
