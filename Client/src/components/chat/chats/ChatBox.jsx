import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import styled from '@emotion/styled'
import { AccountContext } from '../../context/AccountProvider'
import { getConversation } from '../../../service/api'

const Component=styled(Box)`
  display:flex;
  flex-direction:column;
  flex:1;
`

const ChatBox = () => {
  const {person,account}=useContext(AccountContext);
  const [conversation,setConversation]=useState({});

  useEffect(()=>{
    const getConversationDetails = async () => {
      let data = await getConversation({senderId:account.sub , receiverId:person.sub});
      setConversation(data);
    }
    getConversationDetails();
  },[person.sub]);
  return (
    <Component>
        <ChatHeader person={person}/>
        <ChatBody person={person} conversation={conversation}/>
    </Component>
  )
}

export default ChatBox