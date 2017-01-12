node {
    stage('checkout') {
        checkout scm
    }

    // uncomment these 2 lines and edit the name 'node-4.6.0' according to what you choose in configuration
    // def nodeHome = tool name: 'node-4.6.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    // env.PATH = "${nodeHome}/bin:${env.PATH}"

    stage('check tools') {
        sh "node -v"
        sh "npm -v"
        sh "bower -v"
        sh "gulp -v"
        sh "mvn -v"
        sh "docker -v"
        sh "docker-compose -v"
    }

    stage('npm install') {
        sh "npm install"
    }

    stage('clean') {
        sh "mvn clean"
    }

    stage('backend tests') {
        try {
            sh "mvn test"
        } catch(err) {
            throw err
        } finally {
            step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])
        }
    }

    stage('frontend tests') {
        try {
            sh "gulp test"
        } catch(err) {
            throw err
        } finally {
            step([$class: 'JUnitResultArchiver', testResults: '**/target/test-results/karma/TESTS-*.xml'])
        }
    }

    stage('docker-build') {
        sh "mvn package -Pprod -DskipTests docker:build" 
    }
    
    stage('docker-compose') {
          
       sh "docker-compose -f src/main/docker/app.yml stop"
        sh "docker-compose -f src/main/docker/app.yml up"
        
    }
}
