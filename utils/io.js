// 통신 관련된 함수, 코드들을 이 파일에 모두 넣음.
// socket.io는 emit과 on의 조합이라고 보면 쉽다.

module.exports = function (io) {
  // io 관련된 모든 일들을 이 block 안에서 하면 된다.
  // emit() -> 말하는 함수
  // on() -> 듣는 함수

  io.on("connection", async(socket) => { // 연결된 것을 socket이라고 부른다, 연결된 사람의 정보를 매개변수로 보내줌(socket)
    console.log("client is connected", socket.id);

		socket.on("login", async(userName, callBackFunc) => {
			console.log("back-end", userName);
			
		}); // 프론트에서 지정한 "login"을 들어준다. async 처리한 콜백 함수를 활용 response로 받은 유저 이름과 콜백 함수를 받아와 처리한다.

		socket.on("disconnect", () => {
			console.log("user is disconnected")
		}); // 소켓 연결이 끊긴 상황을 듣는다.
  });
};