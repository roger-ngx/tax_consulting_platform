import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
`
const ThreadContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    background-color: white;
    z-index: 1;
    transition: transform 1s;
    padding: 24px 12px;

    ${Container}:hover & {
        transform: translateX(-60px)
    }
`

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    overflow: hidden;
    display: inline-block;
`

const Text = styled.span`
    flex: 1;
    margin-top: 4px;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    white-space: nowrap;
`

const Name = styled.span`
    font-weight:bold
`

const Time = styled.span`
    font-size: 12px;
    margin-left: 8px;
`

const UnreadCount = styled.div`
    border-radius: 50%;
    background-color: #0045D1;
    color: white;
    min-width: 22px;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    font-size: 12px;

    ${Container}:hover & {
        display: none
    }
`

const DeleteButton = styled.button`
    background-color: #FF5D5D;
    color: white;
    border: none;
    height: 100%;
    position: absolute;
    width: 60px;
    top:0;
    right: 0;

    &:hover  {
        background-color: red;
    }
`

type Props = {
    name: string;
    time: string;
    text: string;
    unReadCount: number;
}


const MessageThread : React.FC<Props> = ({name, time, text, unReadCount}) => {

    return (
        <Container
            onClick={() => alert('click')}
        >
            <ThreadContainer>
                <div style={{minWidth: 44}}>
                    <Image src='/assets/icons/person.png' width={44} height={44} />
                </div>
                <TextContainer>
                    <Container>
                        <Name>{name}</Name>
                        <Time>{time}</Time>
                    </Container>
                    <Text>{text}</Text>
                </TextContainer>
                {
                    unReadCount > 0 &&
                    <UnreadCount>{unReadCount > 99 ? '99+' : unReadCount}</UnreadCount>
                }
            </ThreadContainer>

            <DeleteButton>Delete</DeleteButton>
        </Container>
    )
}

export default MessageThread;