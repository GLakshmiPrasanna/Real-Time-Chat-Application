import React, { useContext } from 'react'
import Dialog from '@mui/material/Dialog'
import { Box, List, ListItem, Typography } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google';
import styled from '@emotion/styled';
import jwt_decode from "jwt-decode";

import { AccountContext } from '../context/AccountProvider';
import {addUser} from '../../service/api';

const dialogStyle={
    height:"60%",
    width:"35%",
    maxWidth:"100%",
    maxHeight:"100%",
    boxShadow:"none",
    overflow:"hidden"
}

const Title=styled(Typography) `
  ${'' /* color:#6911f7; */}
  color:#a677f2;
  display:flex;
  justify-content:center;
  margin:2rem 0;
  font-weight:bolder;
  font-size:25px;
`
const Item=styled(ListItem)`
  display:flex;
  justify-content:center;
  margin:2rem 0;
  color:#a677f2;
`
const LoginDialog = () => {

  const {setAccount} = useContext(AccountContext);

  const onLoginSuccess=async (res)=>{
    var decoded=jwt_decode(res.credential);
    console.log(decoded);
    setAccount(decoded);
    await addUser(decoded);
  }
  const onLoginError=(res)=>{
    console.log("Login Failed",res);
  }
  return (
    <Dialog
        open={true}
        PaperProps={{sx: dialogStyle}}
        hideBackdrop={true}
    >
    <Box style={{margin:"17% auto"}}>
      <Title>Sign In</Title>
      {/* <Title>Sign Up</Title> */}
      <Box style={{display:"flex" , justifyContent:"center"}}>
        <GoogleLogin
          onSuccess={onLoginSuccess}
          onError={onLoginError}
        />
      </Box>
      <List>
        <Item>Don't have Account? Sign Up</Item>
        {/* <Item>Already had an account? Sign In</Item> */}
      </List>
    </Box>
    </Dialog>
  )
}

export default LoginDialog