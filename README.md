# fastify-guide
https://fastify.dev/docs/latest/Guides/Getting-Started/

Fastify의 가장 뛰어난 기능 중 하나는 
  - **플러그인을 선언한 순서대로 로드하고, 현재 플러그인이 로드된 후에만 다음 플러그인을 로드한다는 것입니다.** 
    - 이렇게 하면 첫 번째 플러그인에 데이터베이스 커넥터를 등록하고 두 번째 플러그인에서 사용할 수 있습니다 ( 플러그인 범위 처리 방법은 여기 를 참조하세요) .

플러그인 로딩은 fastify.listen(), fastify.inject() 또는 fastify.ready()를 호출할 때 시작됩니다.ㅎ