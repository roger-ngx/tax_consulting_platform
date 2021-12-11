import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setCurrentThreadId } from '../stores/messageSlide';


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
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 8px;
    overflow: hidden;
    display: inline-block;
`

const Text = styled.span`
    max-width: 100%;
    margin-top: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
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
    id: string;
    name: string;
    time: string;
    text: string;
    unReadCount: number;
}


const MessageThread : React.FC<Props> = ({id, name, time, text, unReadCount}) => {

    const dispatch = useDispatch();

    const [ width, setWidth ] = useState();

    const onSelectThread = () => dispatch(setCurrentThreadId(id));

    const ref = useRef(null);

    useEffect(() => {
        ref && setWidth(ref.current.offsetWidth - 70);
    }, [ref])

    return (
        <Container
            ref={ref}
            onClick={onSelectThread}
        >
            <ThreadContainer >
                <div style={{minWidth: 44}}>
                    <Image src='/assets/icons/person.png' width={44} height={44} style={{margin: 'auto'}}/>
                </div>
                <TextContainer>
                    <Container>
                        <Name>{name}</Name>
                        <Time>{time}</Time>
                    </Container>
                    <div
                        style={{
                            width,
                            textOverflow: 'ellipsis',
                            overflow:'hidden',
                            whiteSpace:'nowrap',
                            fontSize: 12,
                            color: '#666'
                        }}
                    >
                        {text}
                    </div>
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