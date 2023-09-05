import React, { useContext, useState } from 'react'
import { Avatar, Box, IconButton} from '@mui/material'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import styled from '@emotion/styled';

import { AccountContext } from '../../context/AccountProvider';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/InfoDrawer';

const HeaderF=styled(Box)`
    display: flex;
    justify-content: space-between;
    border-right: 1px solid rgba(0,0,0,0.1);
    padding: 1.5rem 1.2rem 0.9rem 1.2rem;
    border-bottom:1px solid rgba(0,0,0,0.05);
    background-color:#f6f6f6;
    align-items: center;
`

const HeaderRight=styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    min-width: 10vw;
`

const Header = () => {

    const [openDrawer,setOpenDrawer]=useState(false);
    const {account} = useContext(AccountContext);

    const toggleDrawer=()=>{
        setOpenDrawer(true);
    }
  return (
    <>
        <HeaderF>
            <Box>
                <Avatar src={account.picture} onClick={toggleDrawer}/>
            </Box>
            <HeaderRight>
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <HeaderMenu setOpenDrawer={setOpenDrawer}/>
                </IconButton>
            </HeaderRight>
        </HeaderF>
        <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
    </>
  )
}

export default Header