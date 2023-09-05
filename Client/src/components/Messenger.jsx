import React, { useContext } from 'react'
import LoginDialog from './account/LoginDialog'
import { AppBar, Box, Toolbar, styled } from '@mui/material'
import ChatDialog from './chat/ChatDialog'
import { AccountContext } from './context/AccountProvider'

const LoginHeader=styled(AppBar)`
    height:220px;
    background-color:#9865eb;
    box-shadow:none;
`
const Component=styled(Box)`
    height:100vh;
    background:#e7dcf7;
`

const Messenger = () => {

  const {account} = useContext(AccountContext);

  return (
    <Component>
    {
      account? 
      <>
        <LoginHeader style={{height:"125px"}}>
            <Toolbar>

            </Toolbar>
        </LoginHeader>
        <ChatDialog/>
      </>
      :
      <>
        <LoginHeader>
            <Toolbar>

            </Toolbar>
        </LoginHeader>
        <LoginDialog/>
      </>
    }
    </Component>
  )
}

export default Messenger