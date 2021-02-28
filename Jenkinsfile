#!/usr/bin/env groovy

node {
    environment { 
        CI = 'true'
    }

    stage('checkout') {
        checkout scm
    }

    stage('install tools') {
        if (isUnix()) {
            sh "npm install"
        } else {
            bat(/npm install/)
        }
    }

    stage('build') {
        if (isUnix()) {
            sh "yarn run build"
        } else {
            bat(/yarn run build/)
        }
    }

    stage('Testing') {
        if (isUnix()) {
            sh "yarn run test"
        } else {
            bat(/yarn test --watchAll=false/)
        }
    }


}
