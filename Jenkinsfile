pipeline {
  agent any
  stages {
    stage('deploy') {
      when {
        branch 'dev'
      }

      steps {
        sh 'rm -rf /usr/share/tomcat/webapps/goshopping-ui || true'
        sh 'cp -r build /usr/share/tomcat/webapps/goshopping-ui'
        sh 'rm -rf /usr/share/tomcat/webapps/static || true'
        sh 'mv /usr/share/tomcat/webapps/goshopping-ui/static /usr/share/tomcat/webapps/static'
      }
    }
  }
}
