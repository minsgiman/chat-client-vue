## 사용기술

- vue, vuex, vue-router, vue-i18n, socket.io, jasmin, karma, webpack


### Directory 구조 및 문제해결 전략

* **src/config Directory**: 
    1) socket client 및 vue-router 설정
    
* **src/i18n Directory**: 
    1) vue-i18n 설정 및 string 관리
    
* **src/service Directory** : 
    1) 싱글톤 service directory. Global Event Bus, Socket Client, Vuex Store 로 구성
    2) Socket Client : socket server API를 호출하고 response 또는 push type의 이벤트를 받아서 Global Event Bus를 통해 Page로 event를 Emit한다.
    3) Global Event Bus : Page에서만 Event Handler를 등록하고, Component에서는 사용하지 않도록 rule을 정하였다. 
    4) Vuex Store : UserID, RoomObject 와 같이 여러 곳에서 접근이 필요하고, 동시에 Data binding이 필요한 state를 저장한다.
    
* **src/page Directory** : 
    1) routing 가능한 page directory. 
    2) 싱글톤 service 들의 public method를 호출할 수 있고, Global event Handler를 등록할 수 있다.

* **src/app.vue** :
    1) Vue Root Component. 
    2) '채팅방 초대받기' 와 같이 Page Routing 위치에 상관없이 전역으로 받을 수 있는 Event Handler는 이곳에서 처리한다.

* **src/component** : 
    1) UI Component (vue single file component) directory. page에 child로 붙여서 사용한다.
    2) xxx-dlg.vue 의 Dialog들은 모두 Modal Dialog (modal-dlg.vue) 를 상속받아서 구현하였다.

* **test/unit/specs** :
    1) unit test spec 구현 (socket client api 및 component test)

* **test/unit/test** :
    1) unit test result가 units.html 파일로 생성된다.


### 프로젝트 빌드, 실행방법

#### Install
```sh
npm install
```

#### Run dev-server
```sh
npm run dev
```

#### Run karma unit test
```sh
npm run unit
```

#### Run Build
```sh
npm run build
```