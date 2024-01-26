// 통신 관련된 함수, 코드들을 이 파일에 모두 넣음.
// socket.io는 emit과 on의 조합이라고 보면 쉽다.

module.exports = function (io) {
  // io 관련된 모든 일들을 이 block 안에서 하면 된다.
  // emit() -> 말하는 함수
  // on() -> 듣는 함수

  io.on("connection", async(socket) => { // 연결된 것을 socket이라고 부른다, 연결된 사람의 정보를 매개변수로 보내줌(socket)
    console.log("client is connected", socket.id);
  });
};