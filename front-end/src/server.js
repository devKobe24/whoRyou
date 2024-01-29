import {io} from "socket.io-client";
const socket = io("http://localhost:5001"); //socket 생성, ("연결하고 싶은 back-end 주소 입력"), 이 주소로 연결
export default socket;