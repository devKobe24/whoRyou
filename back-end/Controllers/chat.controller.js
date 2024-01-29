const Chat = require("../Models/chat");// Chat 모델 들고오기

const chatController = {};

chatController.saveChat = async(message, user) => {
  const newMessage = new Chat({
    chat: message,
    user: {
      id: user._id,
      name: user.name
    },
  });
  await newMessage.save();
  return newMessage;
}; 
// 대화를 저장하는 함수 만들기.
// 메시지를 저장하려면 필요한 데이터는 메세지 내용, 유저 정보(user.id, user.name)를 알아야 함(chat.js)
// io.js 내부의 socket.on의 async 의 파라미터로 message를 받는데 그 message로 메세지 내용 정보를 받을 수 있다.
// 유저 정보는 소켓으로 알 수 있다.
// 유저 정보에 토큰값으로 socket.id 값을 같이 저장하기 때문이다. 즉, socket.id를 알면 유저 정보를 알 수 있다는 뜻이다.

module.exports = chatController;