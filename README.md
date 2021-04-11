# cicd-test-k8s

이 저장소는 저의 졸업프로젝트였던 "오늘은 빨래" 서비스를, kubernetes platform에서 운영되도록 수정한 내용을 반영한 곳입니다.

Jenkins와 Gitlab을 활용한 CI/CD pipeline을 구축하시려면 <a href="https://github.com/wotkddl21/kubernetes/week5/CI-CD"> 여기</a>를 참조하시면 됩니다.

위 링크를 따라가면 개발환경에서 git push를 진행하면 구축된 kubernetes cluster에 자동으로 배포되는 CI/CD pipeline이 만들어집니다.

물론, 위와 같은 pipeline을 설계하지 않고도 실행할 수 있습니다.

``` shell
cd react-test
npm install
cd ./client
npm install
cd ../
npm run dev
```
