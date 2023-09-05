import styled from '@emotion/styled'
import { Box } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatFooter from './ChatFooter'
import { AccountContext } from '../../context/AccountProvider'
import { getMessages, newMessage } from '../../../service/api'
import Message from './Message'

const Component = styled(Box)`
    background-image: url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png);
    background-repeat: repeat;
    background-size:50%;
    background-position: center;
    padding: 30px;
    justify-content:space-between;
    overflow-y: scroll;
    height:72.1vh;
`
const Container=styled(Box)`
  padding: 1.5px 5px;
`

const ChatBody = ({person, conversation}) => {

  const [msgText,setMsgText] = useState('');
  const [messages,setMessages] = useState([]);
  const [file,setFile] = useState();
  const [image,setImage] = useState('');
  const [incomingMessage,setIncomingMessage] = useState(null);

  const {account, socket , newMessageFlag , setNewMessageFlag } = useContext(AccountContext);

  const scrollRef = useRef();

  useEffect( () => {
    socket.current.on("getMessage" , data => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now()
      })
    })
  },[socket]);

  useEffect(() => {
    const getMessageDetails = async () => {
      if(conversation?._id)
      {
        let data = await getMessages(conversation._id);
        setMessages(data);
      }
    }
    getMessageDetails();
  },[person._id , conversation , newMessageFlag]);


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ transition: 'smooth' });
  },[messages])

  useEffect( () => {
    incomingMessage && conversation?.members.includes(incomingMessage.senderId) && 
    setMessages(prev => [...prev, incomingMessage])
  } , [incomingMessage , conversation])

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if(code === 13){
      let message={};
      if(!file){
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId:  conversation._id,
          type: 'text',
          text: msgText
        }
      }
      else{
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId:  conversation._id,
          type: 'file',
          text: image
        }
      }

      socket.current.emit("sendMessage", message);

      await newMessage(message);
      setMsgText('');
      setFile('');
      setImage('');
      setNewMessageFlag(prev=>!prev);
    }
  }
  return (
    <>
        <Component>
          {
            messages && messages.map(message=>(
              <Container ref={scrollRef}>
                <Message 
                  message={message} 
                  person={person}
                />
              </Container>
            ))
          }
        </Component>
        <ChatFooter 
          sendText={sendText} 
          setMsgText={setMsgText} 
          msgText={msgText}
          file={file}
          setFile={setFile}
          setImage={setImage}
        />
    </>
  )
}

export default ChatBody