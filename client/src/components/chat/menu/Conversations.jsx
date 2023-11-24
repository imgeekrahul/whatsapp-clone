import { useEffect, useState, useContext } from "react";
import { getUsers } from '../../service/api.js'
import { Box, Divider, styled } from "@mui/material";
import Conversation from "./Conversation.jsx";
import { AccountContext } from "../../context/AccountProvider.jsx";

const Component = styled(Box)`
    height: 81vh;
    overflow: overlay;
`

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`

const Conversations = ({text}) => {
    const [users, setUsers] = useState([]);
    const { account, socket, setActiveUsers } = useContext(AccountContext);
    useEffect(() => {
        const fetchData = async () => {
            let response = await getUsers();
            let filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
            setUsers(filteredData);
        }
        fetchData();
    }, [text])


    useEffect(() => {
        socket.current.emit('addUsers', account)
        socket.current.on('getUsers', users => {
            setActiveUsers(users);
        })
    }, [account])

    return(
        <Component>
            {
                users.map(user => (
                    account.sub !== user.sub && 
                    <>
                        <Conversation user={user} />
                        <StyledDivider />
                    </>
                ))
            }
        </Component>
    )
}

export default Conversations;