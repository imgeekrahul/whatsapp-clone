import { Box } from '@mui/material'
import { useState } from 'react'

// components
import Header from './Header'
import Search from './Search'
import Conversation from './Conversations'


const Menu = () => {
    const [text, setText] = useState('');
    return(
        <Box>
            <Header />
            <Search setText={setText} />
            <Conversation text={text} />
        </Box>
    )
}

export default Menu