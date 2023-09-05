import React, { useContext, useEffect, useState } from 'react'
import { getUsers } from '../../../service/api';
import { Box, Divider } from '@mui/material';

import {AccountContext} from '../../context/AccountProvider'
import Convo from './Convo';
import styled from '@emotion/styled';

const Component=styled(Box)`
    height:81vh;
    overflow:overlay;
`
const Line=styled(Divider)`
    margin:0 0 0 70px;
    background-color:#e9edef;
    opacity:0.5;
`

const Conversations = ({text}) => {

    const {account , socket , setActiveUsers }=useContext(AccountContext);

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        const fetchUsers=async ()=>{
            const response=await getUsers();
            const filterData=response.filter(user=>user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filterData);
        }
        fetchUsers();
    },[text]);

    
    useEffect(()=>{
        socket.current.emit("addUsers", account);
        socket.current.on("getUsers", users => setActiveUsers(users));
    }, [account]);


  return (
    <Component>
        {users.map((user)=>(
            (user.sub!==account.sub) && 
            <>
                <Convo user={user}/>
                <Line/>
            </>
        ))}
    </Component>
  )
}

export default Conversations