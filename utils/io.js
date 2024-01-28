// 통신 관련된 함수, 코드들을 이 파일에 모두 넣음.
// socket.io는 emit과 on의 조합이라고 보면 쉽다.

const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");

module.exports = function (io) {
  // io 관련된 모든 일들을 이 block 안에서 하면 된다.
  // emit() -> 말하는 함수
  // on() -> 듣는 함수

  io.on("connection", async (socket) => {
    // 연결된 것을 socket이라고 부른다, 연결된 사람의 정보를 매개변수로 보내줌(socket)
    console.log("client is connected", socket.id);

    // 시스템 메시지 작성
    socket.on("login", async (userName, callBackFunc) => {
      const welcomeMessage = {
        chat: `${userName} is joined to this room`,
        user: { id: null, name: "system"},
      };
      io.emit("message", welcomeMessage);

      // try-catch를 활용하여 error handeling
      try {
        // 유저 정보를 저장 -> 통신과는 관련 없는 정보(Controller)
        const user = await userController.saveUser(userName, socket.id);
        // 콜백 함수를 통해서 유저 정보를 보내줌
        callBackFunc({ ok: true, data: user });
      } catch (error) {
        // error이 발생했을 경우 다시 콜백함수를 호출
        callBackFunc({ ok: false, error: error.message });
      }
    }); // 프론트에서 지정한 "login"을 들어준다. async 처리한 콜백 함수를 활용 response로 받은 유저 이름과 콜백 함수를 받아와 처리한다.

    socket.on("sendMessage", async (message, callBackFunc) => {
      try {
        // 1. socket id로 유저 찾기
        const user = await userController.checkUser(socket.id);

        // 2. 메세지 저장하기(매게변수로 유저 정보)
        const newMessage = await chatController.saveChat(message, user);

        // 3. 메시지가 클라이언트 A로부터 온 것을 다른 모든 클라이언트 들에게 알려야함.
        io.emit("message", newMessage);
        callBackFunc({ ok: true });
      } catch (error) {
        callBackFunc({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    }); // 소켓 연결이 끊긴 상황을 듣는다.
  });
};
