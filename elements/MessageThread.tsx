import React, { useRef, useEffect, useState } from 'react';
import styled, {css} from 'styled-components';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDesUserId, setCurrentThreadId, setCurrentDesUser } from '../stores/messageSlide';
import { useFirestore } from 'react-redux-firebase';
import User from '../models/User';
import { getUserById } from '../firebase/firebaseUser';


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    cursor: pointer;
`

type TC = {
    selected: boolean
}

const ThreadContainer = styled.div<TC>`
    display: flex;
    flex-direction: row;
    background-color: #f4f4f4;  
    flex: 1;
    align-items: center;
    z-index: 1;
    transition: transform 1s;
    padding: 24px 12px;

    ${
        props => props.selected && css`background-color: #ddd`
    }
    `
    // ${Container}:hover & {
    //     transform: translateX(-60px)
    // }

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
    desUserId?: string;
    time?: string;
    text?: string;
    unReadCount?: number;
    getLastMessage: (userId: string, desUsername:string) => string,
    selected: boolean
}


const MessageThread : React.FC<Props> = ({id, desUserId, time, getLastMessage, unReadCount=0, selected=false}) => {
    if(!desUserId){
        return null;
    }

    const dispatch = useDispatch();

    const userId = useSelector((state: any) => state.firebase.auth.uid);

    const [ width, setWidth ] = useState<number>();
    const [ desUser, setDesUser ] = useState<User>();
    const [ lastMessage, setLastMessage ] = useState<string>();
    const [ threadSelected, setThreadSelected ] = useState(false);

    const onSelectThread = () => {
        dispatch(setCurrentThreadId(id));
        dispatch(setCurrentDesUserId(desUserId));
        if(threadSelected){
            desUser && dispatch(setCurrentDesUser(desUser.original));
        }else{
            setThreadSelected(true);
        }
    }

    const ref = useRef(null);

    useEffect(() => {
        ref.current && setWidth((ref.current as HTMLElement).offsetWidth - 70);
    }, [ref])

    useEffect(() => {
        console.log(desUserId);
        if(desUserId){
            getDesUser();
        }
    }, [desUserId]);

    useEffect(() => {
        if(desUser){
            threadSelected && dispatch(setCurrentDesUser(desUser.original));
            !lastMessage && setLastMessage(getLastMessage ? getLastMessage(userId, desUser.name): '');
        }
    }, [desUser, threadSelected]);

    const getDesUser = async () => {
        if(desUserId){
            const userData = await getUserById(desUserId);
            userData && setDesUser(new User(userData));
        }
    }

    console.log('selected', selected);

    return (
        <Container
            ref={ref}
            onClick={onSelectThread}
        >
            <ThreadContainer selected={selected}>
                <div style={{minWidth: 44, borderRadius: 22, overflow: 'hidden', fontSize: 0}}>
                    <Image src={desUser?.photoURL || '/assets/images/profile.png'} width={44} height={44} />
                </div>
                <TextContainer>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Name>{desUser?.name}</Name>
                        <Time>{time}</Time>
                    </div>
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
                        {lastMessage}
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