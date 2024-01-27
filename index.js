// WebSocket connect를 위한 index.js file

/*
1. HTTP를 통해 서버를 만든다.
2. 만든 서버 위에 WebSocket을 올린다.
3. express로 만든 서버를 올린다.
*/

const {createServer} = require("http");// http를 통해 서버 만들기.
const app = require("./app"); // app 가져오기
const {Server} = require("socket.io");// WebSocket을 가져오는 Server 생성. socket.io를 활용해서 가져온다.
require("dotenv").config(); // .env를 사용하므로 이 코드가 필요함.

// createServer를 통해 http서버를 만들것임
const httpServer = createServer(app); // DB 연결부분을 올린다.
const io = new Server(httpServer, {
  cors: {
    origin:"http://localhost:3000"// 접속을 허가할 호스트
  },
}, () =>{
  console.log("Server is open");
});// httpServer를 올린다.

require("./utils/io")(io); // uitils의 함수 매개변수 io를 넘겨주는 코드

// httpServer 틀어놔야함.
httpServer.listen(process.env.PORT, () =>{
  console.log("server listening on port",process.env.PORT);
})// PORT NUMBER 기준으로 띄워주기