import { MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useContext } from 'react'
import { AccountContext } from '../../context/AccountProvider'

const Component = styled(Box)`
    display: flex;
    padding: 2.5rem 1rem 0.7rem 1.3rem;
    align-items: center;
    border-bottom: 1px solid lightgray;
    background-color:#f6f6f6;
    justify-content: space-between;
    height: 6.7vh;
`
const HeaderInfo=styled(Box)`
    flex: 1;
    padding-left: 20px;
    & :first-of-type
    {
        font-weight: 500;
        margin-bottom: 3px;
    }
    & :last-of-type
    {
        font-size: 12px;
        color: gray;
    }
`

const ChatHeader = ({person}) => {

    const {activeUsers} = useContext(AccountContext);

  return (
    <Component>
        <Avatar src={person.picture}/>
        <HeaderInfo>
            <Typography>{person.name}</Typography>
            <Typography>{activeUsers?.find(user => user.sub === person.sub) ? "Online" : "Offline"}</Typography>
        </HeaderInfo>
        <Box>
            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <IconButton>
                <MoreVert/>
            </IconButton>
        </Box>
    </Component>
  )
}

export default ChatHeader