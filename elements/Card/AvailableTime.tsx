import React from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

type Props = {
    contactTime: string
}

const AvailableTime: React.FC<Props> = ({contactTime}) => {

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: 0
            }}
        >
            <ChatBubbleIcon sx={{color: '#838383', fontSize: '14px'}} />
            <span style={{fontSize: 12, color: '#959595', lineHeight: '12px', marginLeft: 4}}>
                {contactTime}
            </span>
        </div>
    )
}

export default AvailableTime;