import { Box, styled } from "@mui/material";
import Footer from "./Footer";
import { useContext, useEffect, useState, useRef } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { getMessage, newMessage } from "../../service/api";
import { Message } from "./Message";

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`

const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`

const Container = styled(Box)`
    padding: 1px 80px;
`

const Messages = ({ person, conversation }) => {

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);

    const [file, setFile] = useState();

    const [image, setImage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);

    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext)

    const scrollRef = useRef();

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            });
        })
    }, [])


    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessage(conversation._id)
            setMessages(data);
        }
        conversation._id && getMessageDetails();
    }, [person._id, conversation._id, newMessageFlag])


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: 'smooth' })
    }, [messages])

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
            setMessages(prev => [...prev, incomingMessage])
    }, [incomingMessage, conversation])

    const sendText = async (e) => {
        const code = e.keyCode || e.which
        console.log(e)
        if(code == 13) {    // if we press enter then the message is send
            let message = {};
            if(!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                }
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image
                }
            }
            
            socket.current.emit('sendMessage', message);

            await newMessage(message);
            setValue('');
            setFile('');
            setImage('');
            setNewMessageFlag(prev => !prev)
        }
    }

    return(
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message => (
                        <Container ref={scrollRef}>
                            <Message message={message} />
                        </Container>
                    ))
                }
            </Component>
            <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} setImage={setImage} />
        </Wrapper>
    )
}

export default Messages;