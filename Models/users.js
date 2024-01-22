// 유저라는 정보가 어떻게 생겼는지 보여주는 "유저 스키마"를 생성

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must type name"],
    unique: true,
  },
  token: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.module("User", userSchema);