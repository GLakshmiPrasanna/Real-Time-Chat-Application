import styled from '@emotion/styled'
import { ArrowBack } from '@mui/icons-material'
import { Box, Drawer, Typography } from '@mui/material'
import React from 'react'

import Profile from './Profile'

const drawerStyle={
    height:"96%",
    width:"34%",
    margin:"16px auto 16px 20px",
    maxWidth:"100%",
    maxHeight:"100%",
    boxShadow:"none",
    borderRadius:"0",
    overflow:"hidden"
}

const Header=styled(Box)`
    display:flex;
    background-color:#a677f2;
    height:15%;
    & > svg, & > p{
        color:white;
        margin-top:auto;
        padding:15px;
        font-weight:600;
    }
`
const Component=styled(Box)`
    height:85%;
    background-color:#d5c6ec;
`

const InfoDrawer = ({open,setOpen}) => {
    
    const handleClose=()=>{
        setOpen(false);
    }
  return (
    <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{sx:drawerStyle}}
        style={{zIndex:1500}}
    >
        <Header>
            <ArrowBack onClick={handleClose}/>
            <Typography>Profile</Typography>
        </Header>
        <Component>
            <Profile/>
        </Component>
    </Drawer>
  )
}

export default InfoDrawer