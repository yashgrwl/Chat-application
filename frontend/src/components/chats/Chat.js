import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { myContext } from "../../App";
import socketIO from "socket.io-client";
import sendImage from '../../images/send.png'
import Message from "../message/Message";
import './chat.css'
import close from '../../images/closeIcon.png'
import ScrollToBottom from 'react-scroll-to-bottom';

const ENDPOINT = "https://chat-backend-6siu.onrender.com/";

let socket;
const Chat = () => {
  const { user } = useContext(myContext);
  const [text,setText]=useState('');
  const [id,setId]=useState();
  const [message,setMessage]=useState([])
 
 
  const send=()=>{
    socket.emit('message',{text,id})
    setText('')
  } 
  

  useEffect(() => {
   
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
   
    socket.on("connect", () => {
      //alert('connection established')
      setId(socket.id);
    });
    socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
      setMessage([...message,data]);
    })

   
    socket.on('leave',(data)=>{
      setMessage([...message,data]);
    })

    socket.on('userjoined',(data)=>{
      setMessage([...message,data]);
    })

    return ()=>{
      socket.emit('disconnectUser')
      socket.off();
    }

   

  }, []);
  

  useEffect(()=>{

    

   
    socket.on('sendMessage',(data)=>{
      setMessage([...message,data]);
      console.log(message);
    })
    return ()=>{
      socket.off()
    }
  },[message])

  return (
    <div className="chatPage">
      
      <div className="chatContainer">
        <div className="header">
          <h2>Chat With Friends</h2>
          <a href='/'><img src={close} alt='text'/></a>
        </div>
        <ScrollToBottom className="chatBox">
          {
            message.map((val)=>{
              return <Message message={val.msg} classs={id===val.id?'right':'left'} user={id===val.id?"":val.user}/>
            })
          }
        </ScrollToBottom>
        <div className="inputBox">
          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} id="chatInput"/>
          <button className="sendBtn" onClick={send}><img src={sendImage} alt="txt"/></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
