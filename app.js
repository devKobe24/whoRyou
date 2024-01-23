// express를 활용하여 서버 생성.
const express = require("express")
const mongoose = require("mongoose") // DB와 연결을 도와주는 mongoose 가져오기.
const app = express() // express를 사용하여 app 생성.

// mongoose를 활용하여 연결
/*
mongoose.connect("DB ADDRESS가 들어가면 됨", { 옵션 })
*/ 

// DB 주소 같은 경우, 중요한 변수이므로 따로 .env에 저장하여 관리함.
mongoose.connect("", {
  userNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("connected to database"));

module.exports = app