import { Avatar, Box, Typography } from '@mui/material'
import React, { useContext } from 'react'

import { AccountContext } from '../context/AccountProvider'
import styled from '@emotion/styled'

const BoxWrap=styled(Box)`
    background-color:#ffffff;
    padding:12px 30px 2px;
    box-shadow:0 1px 3px rgba(0,0,0,0.1);
    & :first-of-type{
        font-size:13px;
        color:#936bd6;
        font-weight:200;
    }
    & :last-of-type{
        margin:14px 0;
        color:#4A4A4A
    }
`

const Profile=()=>{
    
    const {account}=useContext(AccountContext);
    return (
        <>
            <Box style={{display:"flex" , justifyContent:"center" , padding:"25px 0"}}>
                <Avatar src={account.picture} style={{height:"200px" , width:"200px"}}/>
            </Box>
            <BoxWrap>
                <Typography>Your Name</Typography>
                <Typography>{account.name}</Typography>
            </BoxWrap>
            <Box style={{padding:"15px 20px 28px 30px"}}>
                <Typography style={{fontSize:"13px" , color:"#738C9C"}}>This is not your username or pin. This name will be visible to your contacts.</Typography>
            </Box>
            <BoxWrap>
                <Typography>About</Typography>
                <Typography>Code! Code! Code!</Typography>
            </BoxWrap>
        </>
    )
}

export default Profile