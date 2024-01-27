const User = require("../Models/users"); // User 모델 가져오기
const userController = {};

userController.saveUser = async(userName, socketId) => {
  // 1. 이미 있는 유저인지 확인.
  let user = await User.findOne({ name: userName });
  // 2. 없다면 새로 유저정보 만들기.
  if (!user) {
    user = new User({
      name: userName,
      token: socketId,
      online: true
    });
  }
  // 3. 이미 있는 유저라면 연결 정보 token 값만 바꿔주기.
  user.token = socketId;
  user.online = true;

  await user.save();
  return user;
};

module.exports = userController;