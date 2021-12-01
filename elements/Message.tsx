import React from 'react';
import styled, { css } from 'styled-components';
import dayjs, { Dayjs }  from 'dayjs'

const Container = styled.div`
    display: flex;
    ${
        props => props.isMine ? 
        css`flex-direction: row-reverse`
        :
        css`flex-direction: row`
    }
`

const MessageContainer = styled.div`
    border-radius: 32px;
    padding: 8px 16px;
    align-self: flex-start;

    ${
        props => props.isMine ? 
        css`background-color: #fff; border: solid 1px #C7C7C7;`
        :
        css`background-color: #B6CEFF; border: solid 1px #B6CEFF;`
    }
`

const Text = styled.span`

`

const TextTime = styled.span`
    font-size: 12px;
    color: #888;
    align-self: flex-end;

    ${
        props => props.isMine ? 
        css`margin-left: 12px;`
        :
        css`margin-right: 12px;`
    }
`

type Props = {
    text: string;
    time: Dayjs;
    isMine: boolean;
}

const Message: React.FC<Props> = ({text, time, isMine}) => {

    return(
        <Container isMine={isMine}>
            <MessageContainer isMine={isMine}>
                <Text>{text}</Text> 
            </MessageContainer>
            <TextTime isMine={isMine}>{time}</TextTime>
        </Container>
    )
}

export default Message;