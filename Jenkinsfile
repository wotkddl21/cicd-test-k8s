def DOCKER_IMAGE_NAME = "wotkddl21"           // 본인 docker hub 계정
def DOCKER_IMAGE_TAGS = "cicd-test"  // 설정하고자 하는 tag  주로 def tag = "tag"+new Date();로 설정
def NAMESPACE = "cicd-space"
def DATE = new Date();
  
podTemplate(
    label: 'builder',
            containers: [
                containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
                containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:latest', command: 'cat', ttyEnabled: true)
            ],
            volumes: [
                hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
            ]) {
    node('builder') {
        stage('Checkout') {
             checkout scm   // gitlab으로부터 소스 다운
        }
        stage('Docker build') {
            container('docker') {
                withCredentials([usernamePassword(
                    credentialsId: 'docker_credential',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD')]) {
                        /* jenkins에 등록된 credentialsId 를 통해 docker account 접근 */
                        sh "docker build -t ${DOCKER_IMAGE_NAME}/${DOCKER_IMAGE_TAGS} ."
                        sh "docker login -u ${USERNAME} -p ${PASSWORD}"
                        sh "docker push ${DOCKER_IMAGE_NAME}/${DOCKER_IMAGE_TAGS}"
                }
            }
        }
        stage('Run kubectl') {
            container('kubectl') {
                withCredentials([usernamePassword(
                    credentialsId: 'docker_credential',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD')]) {
                        /* namespace 존재여부 확인후, 없다면 namespace 생성 */
                        sh "kubectl get ns ${NAMESPACE}|| kubectl create ns ${NAMESPACE}"

                        /* secret 존재여부 확인. 미존재시 secret 생성 */
                        sh """
                            kubectl get secret my-secret -n ${NAMESPACE} || \
                            kubectl create secret docker-registry my-secret \
                            --docker-server=https://index.docker.io/v1/ \
                            --docker-username=${USERNAME} \
                            --docker-password=${PASSWORD} \
                            --docker-email=jaesang.park@samyang.com \
                            -n ${NAMESPACE}
                        """
                        /* yaml파일에 변화가 없다면 새롭게 배포하지 않기 때문에 수정내역을 반영하려면 yaml파일에 변화를 줘야한다. */
                        /* k8s-deployment.yaml에서, env.value의 값을 수정 */
                        /* value : 'DATE' */
                        sh "echo ${DATE}"
                        /* value: 를 value: '${DATE}' 값으로 변경*/
                        sh "sed -i \"s/value:.*/value: '${DATE}'/g\" ./k8s/deployment.yaml"
                        
                        sh "kubectl apply -f ./k8s/deployment.yaml -n ${NAMESPACE}"
                        sh "kubectl apply -f ./k8s/service.yaml -n ${NAMESPACE}"
                    }
                }
            }
        }
    }
    