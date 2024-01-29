import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server"; // socket 들고오기.
import InputField from "./components/InputField/InputField" // InputField 가져오기
import MessageContainer from "./components/MessageContainer/MessageContainer";
// import { useSelect } from "@mui/base";

function App() {

	const [user, setUser] = useState(null); // 이 코드??
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);
	console.log("message List", messageList);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessageList((prevState) => prevState.concat(message));
		});

		askUserName();
	}, []);

  const askUserName=()=>{
		const userName = prompt("당신의 이름을 입력하세요");
		
		socket.emit("login", userName, (res) => {
			console.log("Res", res)
			// 지금 앱에서의 로그인은 받은 유저의 정보를 저장하고 소켓 아이디도 저장하는것
			if(res?.ok) {
				setUser(res.data);
			}
		}); // 소켓을 사용하여 입력 받은 사용자의 이름을 보낸다., 콜백 함수를 사용하여 response 값을 받아 처리 가능
	};
	const sendMessage = (event) => {
		event.preventDefault() // 웹사이트가 계속 Refesh 되는 것을 막는다.
		socket.emit("sendMessage", message, (res) => {
			console.log("Send Message res", res);
		}); //emit을 활용하여 메세지를 보낸다.
	};

  return (
    <div>
      <div className="App">
				<MessageContainer messageList={messageList} user={user}/>
				<InputField 
					message = {message} 
					setMessage = {setMessage} 
					sendMessage = {sendMessage}
				/>
			</div>
    </div>
  );
}

export default App;
