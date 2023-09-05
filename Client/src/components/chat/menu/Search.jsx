import { Box, InputBase } from '@mui/material'
import React from 'react'
import { SearchOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';

const SearchField=styled(Box)`
    display: flex;
    align-items: center;
    height: 40px;
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
`
const SearchContainer=styled(Box)`
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
    width: 100%;
    height: 35px;
    border-radius: 20px;
`
const Search = ({setText}) => {
  return (
    <SearchField>
        <SearchContainer>
            <Box style={{color:"gray", padding:"10px"}}>
                <SearchOutlined/>
            </Box>
            <InputBase
                placeholder='Search or start a new chat'
                onChange={(e)=>{setText(e.target.value)}}
            />
        </SearchContainer>
    </SearchField>
  )
}

export default Search