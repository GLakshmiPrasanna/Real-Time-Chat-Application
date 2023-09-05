import styled from '@emotion/styled'
import { AttachFile, InsertEmoticon, Mic } from '@mui/icons-material'
import { Box, IconButton, InputBase } from '@mui/material'
import { useEffect } from 'react'
import { uploadFile } from '../../../service/api'

const Component = styled(Box)`
    display: flex;
    justify-content: space-between;
    background-color:#f6f6f6;
    align-items: center;
    height: 60px;
    margin-top: auto;
    border-top: 1px solid lightgray;
    & > svg{
        padding: 10px;
        color: gray;
    }
`
const Input=styled(Box)`
    flex: 1;
    background-color:white;
    border: none;
    outline: none;
    border-radius:20px;
    & :first-of-type{
        flex:1;
        padding:5px 5px 5px 10px;
        width:100%;
        height:40px;
    }
`

const ChatFooter = ({sendText , setMsgText , msgText , file , setFile , setImage}) => {

    useEffect(() => {
        const getImage = async () => {
            if(file){
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);

                let response = await uploadFile(data);
                setImage(response.data);
            }
        }
        getImage();
    },[file])

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setMsgText(e.target.files[0].name);
    }

  return (
    <Component>
        <Box style={{display:"flex"}}>
        <IconButton>
            <InsertEmoticon/>
        </IconButton>
        <IconButton>
            <label htmlFor='fileInput'>
                <AttachFile style={{transform:"rotate(40deg)"}}/>
            </label>
        </IconButton>
        <input
            type="file"
            id="fileInput"
            style={{display:"none"}}
            onChange={(e) => onFileChange(e)}
        />
        </Box>
        <Input>
            <InputBase 
                placeholder='Type a message'
                onChange={(e)=>setMsgText(e.target.value)}
                onKeyDown={(e)=>sendText(e)}
                value={msgText}
            />
        </Input>
        <IconButton>
            <Mic/>
        </IconButton>
    </Component>
  )
}

export default ChatFooter