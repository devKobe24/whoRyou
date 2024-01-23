// express를 활용하여 서버 생성.
const express = require("express");
const mongoose = require("mongoose"); // DB와 연결을 도와주는 mongoose 가져오기.
require('dotenv').config();// .env 가져오기
const cors = require("cors");// front-end의 무작위 접근을 막기 위한 cors 
const app = express(); // express를 사용하여 app 생성.
app.use(cors()); // 어떤 접근이든 허용?

// mongoose를 활용하여 연결
/*
mongoose.connect("DB ADDRESS가 들어가면 됨", { 옵션 })
*/ 

// DB 주소 같은 경우, 중요한 변수이므로 따로 .env에 저장하여 관리함.
mongoose.connect(process.env.DB, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(()=>console.log("connected to database!!!!!"));

module.exports = app;