import { Box, Dialog } from '@mui/material'
import React, { useContext } from 'react'
import styled from '@emotion/styled'

import Menu from './menu/Menu'
import EmptyChat from './chats/EmptyChat'
import ChatBox from './chats/ChatBox'
import { AccountContext } from '../context/AccountProvider'


const dialogStyle={
    height:"96vh",
    width:"100%",
    margin:"20px",
    maxWidth:"100%",
    maxHeight:"100%",
    boxShadow:"none",
    borderRadius:"0",
    overflow:"hidden"
}

const Component=styled(Box)`
    display:flex;
`
const LeftComponent=styled(Box)`
    display:flex;
    flex-direction:column;
    flex:0.35;
    border-right:1px solid lightgrey;
`
const RightComponent=styled(Box)`
    display:flex;
    flex-direction:column;
    flex:0.65;
`

const ChatDialog = () => {
    const {person} = useContext(AccountContext);
  return (
    <Dialog
        open={true}
        PaperProps={{sx: dialogStyle}}
        hideBackdrop={true}
    >
        <Component>
            <LeftComponent>
                <Menu/>
            </LeftComponent>
            <RightComponent>
                {Object.keys(person).length ? <ChatBox/> : <EmptyChat/>}
            </RightComponent>
        </Component>
    </Dialog>
  )
}

export default ChatDialog