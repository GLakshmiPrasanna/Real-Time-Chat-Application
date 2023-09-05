import styled from '@emotion/styled';
import { Avatar, Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'

import {AccountContext} from '../../context/AccountProvider'
import { getConversation, setConversation } from '../../../service/api';

import { formatDate } from '../../../utils/common-utils';

const Component=styled(Box)`
    display : flex; 
    height : 45px;
    padding : 13px 0;
    cursor:pointer;
`
const Container = styled(Box)`
  display : flex; 
  align-items : center;
`
const Time=styled(Typography)`
  font-size : small;
  margin-left: auto;
  color: grey;
  margin-right: 20px;
`
const Text=styled(Typography)`
  font-size : 15px;
  color: rgba(0,0,0,0.6);
`

const Convo = ({user}) => {
  const {setPerson, account, newMessageFlag} = useContext (AccountContext);

  const [message, setMessage] = useState({});

  useEffect(()=>{
    const getConversationDetails = async () => {
      const data = await getConversation({ senderId : account.sub , receiverId : user.sub});
      setMessage({text: data?.message, timestamp: data?.updatedAt})
    }
    getConversationDetails();
  },[newMessageFlag]); 

  const getUser = async ()=>{
    setPerson(user);
    await setConversation({senderId:account.sub , receiverId:user.sub});
  }
  return (
    <Component onClick={()=>{getUser()}}>
        <Box style={{padding:"0 14px"}}>
            <Avatar src={user.picture} alt="dp"/>
        </Box>  
        <Box>
          <Box style={{width:"28vw"}}>
              <Container>
                <Typography>{user.name}</Typography>
                {
                  message?.text && 
                  <Time>{formatDate(message?.timestamp)}</Time>
                }
              </Container>
          </Box> 
          <Box>
            <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
          </Box>
        </Box>
    </Component>
  )
}

export default Convo;