import React from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

type Props = {
    contactTime: number[]
}

const AvailableTime: React.FC<Props> = ({contactTime}) => {

    const startTime = `0${contactTime[0]}:00`.slice(-5);
    const endTime = `0${contactTime[1]}:00`.slice(-5);

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
                {`${startTime} ~ ${endTime}`}
            </span>
        </div>
    )
}

export default AvailableTime;