import styled from '@emotion/styled'
import { MoreVert } from '@mui/icons-material'
import { Box, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'

const MenuOption=styled(MenuItem)`
    font-size:14px;
    padding:15px 60px 5px 24px;
    color:#4A4A4A;
`

const HeaderMenu = ({setOpenDrawer}) => {
    // const options = [
    //     'Profile',
    //     'Account',
    //     'LogOut'
    // ];
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <Box>
        <MoreVert onClick={handleClick}/>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            getContentAnchorE1={null}
            transformOrigin={{
                horizontal:'right'
            }}
        >
            <MenuOption onClick={()=>{handleClose(); setOpenDrawer(true);}}>Profile</MenuOption>
            <MenuOption onClick={handleClose}>Account</MenuOption>
            <MenuOption onClick={()=>{handleClose();}}>Log Out</MenuOption>
            {/* {options.map((option) => (
            <MenuOption onClick={handleClose}> */}
                {/* {option} */}
            {/* </MenuOption>
            ))} */}
        </Menu>
    </Box>
  )
}

export default HeaderMenu