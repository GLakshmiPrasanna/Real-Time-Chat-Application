import React, { useContext } from 'react'
import { formatDate, downloadMedia } from '../../../utils/common-utils'
import { Avatar, Box, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { AccountContext } from '../../context/AccountProvider'
import { Download } from '@mui/icons-material'

import {iconPDF} from '../../../constants/data.js'

const Sent = styled(Box)`
    background: #dcf8c6;
    max-width: 60%;
    padding:5px;
    width: fit-content;
    margin-left: auto;
    display : flex;
    border-radius: 10px;
    word-break: break-word;
`
const Received = styled(Box)`
    background: #ffffff;
    max-width: 60%;
    padding:5px;
    width: fit-content;
    display : flex;
    flex-direction: column;
    border-radius: 10px;
    word-break: break-word;
`
const Text=styled(Typography)`
    font-size:16px;
    padding:7px 25px 0 5px;
`
const Time=styled(Typography)`
    font-size:xx-small;
    color:#919191;
    word-break:keep-all;
    margin-top:auto;
    margin-left:auto;
`
const RMsg = styled(Box)`
    display: flex;
`
const Name=styled(Typography)`
    font-size:x-small;
    padding: 0 5px;
`
const Message = ({message , person}) => {
    const {account} = useContext(AccountContext);
  return (
    <>
        {
            account.sub===message.senderId ?
                <Sent>
                    {
                        message.type === 'file' ? <ImageMessage message={message}/> : <TextMessage message={message}/>
                    }
                </Sent>
            :
                <RMsg>
                    <Avatar src={person.picture}/>
                    <Received>
                        <Name>{person.name}</Name>
                        {
                            message.type === 'file' ? <ImageMessage message={message}/> : <TextMessage message={message}/>
                        }
                    </Received>
                </RMsg>
        }
    </>
  )
}

const ImageMessage = ({message}) => {
    return (
        <Box style={{position:"relative"}}>
            {
                message?.text?.includes('.pdf') ? 
                    <Box style={{display:"flex", alignItems:"center"}}>
                        <img src={iconPDF} alt="pdf" style={{width:80}}/>
                        <Typography style={{fontSize : 14}}> {message.text.split('/').pop()} </Typography>
                    </Box>
                :
                <img style={{width: 300 , height:"100%" , objectFit:"cover"}} src={message.text} alt={message.text}/>
            }

            <Time style={{position:"absolute" , bottom:0 , right:0}}>
                <Download
                    onClick={(e)=>downloadMedia(e,message.text)}
                    style={{marginRight:10, border:"1px solid grey", borderRadius:"50%"}}
                    fontSize='small'
                />
                {formatDate(message.createdAt)}
            </Time>
        </Box>
    )
}

const TextMessage = ({message}) => {
    return (
        <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    )
}
export default Message