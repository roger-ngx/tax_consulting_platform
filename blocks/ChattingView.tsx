import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux'
import { map, includes, filter, find } from 'lodash';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import MessageView from '../elements/Message';
import MessageThread from '../elements/MessageThread';
import MessageInput from '../elements/MessageInput';
import Avatar from '../elements/Avatar';
import Messages from './Messages';
import { MESSAGE_TYPE, Message } from '../models/Message';
import ChatThread from '../models/ChatThread';
import ImageUpload from '../elements/ImageUpload';
import { FileUpload } from '../stores/fileTranferSlice';
import FileUploadView from '../elements/FileUpload';
import User from '../models/User';
import { RootState } from '../stores/store';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    border: solid 1px #C7C7C7;
    height: 100%;
`

const ThreadsView = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
    overflow-y: scroll;
    height: calc(100vh - 90px);
`

const ChatView = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    height: calc(100vh - 90px);
    overflow: scroll;
`

const ChatViewHeader = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Horizontal = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center
`

const ChatViewBody = styled.div`
    flex: 1;
    padding: 8px;
    height: 100%;
    overflow: scroll;
`

const ChatViewFooter = styled.div`
    padding: 8px;
`

const ThreadHeader = () => {

    const user = useSelector((state: any) => state.firebase.auth);
    
    return (
        <div
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 12}}
        >   
            <Avatar
                src={user.photoURL}
                size={32}
            />
            <span style={{flex: 1, fontWeight: 'bold', textAlign: 'center', marginLeft: -24}}>Messenger</span>
        </div>
    )
}

const ThreadList = () => {

    const userId = useSelector((state: any) => state.firebase.auth.uid);
    console.log('userId', userId);

    useFirestoreConnect([{
        collection: 'chats',
        where: ['userIDs', 'array-contains', userId],
        storeAs: 'chats',
        orderBy: ['updatedAt', 'desc'],
    }])

    const chats = map(useSelector((state: any) => state.firestore.ordered.chats), chat => new ChatThread(chat));

    const currentThreadId = useSelector((state:any) => state.messages.currentThreadId);

    return (
        <ThreadsView>
            <ThreadHeader />
            {
                map(chats, chat => (
                    <div key={chat.time} style={{width: '100%'}}>
                        <MessageThread
                            id={chat.id}
                            desUserId={find(chat.userIDs, id => id !== userId)}
                            time={chat.time}
                            getLastMessage={chat.lastMessage}
                            unReadCount={chat.unReadCount}
                            selected={currentThreadId===chat.id}
                        />
                    </div>
                ))
            }
        </ThreadsView>
    )
}

type Props = {
    chatId: string
}

const MessageList : React.FC<Props> = ({chatId}) => {
    if(!chatId) return null;

    console.log('chatId', chatId);

    const userId = useSelector((state: any) => state.firebase.auth.uid);

    useFirestoreConnect([{
        collection: 'chats',
        doc: chatId,
        subcollections: [{
            collection: 'messages',
            orderBy: ['createdAt', 'asc'],
        }],
        storeAs: 'messages',
    }])

    const messages = map(useSelector((state: any) => state.firestore.ordered.messages), message => new Message(message));

    const uploads: FileUpload[] = filter(useSelector((state: any) => state.fileTransfer.uploadFiles), file => file.status === 'running');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <>
            {
                map(messages, (message: Message) => (
                    <div style={{marginBottom: 4}}>
                        {
                            message.type === 'text' &&
                            <MessageView
                                text={message.text}
                                time={message.time}
                                isMine={message.srcUserId===userId}
                            />
                        }
                        {
                            includes(message.type, 'image') &&
                            <ImageUpload
                                src={message.text}
                                size={80}
                                time={message.time}
                                isMine={message.srcUserId===userId}
                            />
                        }

                        {
                            includes(message.type, 'application') &&
                            <FileUploadView
                                name={message!.name}
                                size={message!.size}
                                downloadUrl={message.text}
                                time={message.time}
                                isMine={message.srcUserId===userId}
                            />
                        }
                    </div>
                ))
            }
            {
                map(uploads, file => {
                    if(file.type.includes('image')){
                        return (
                            <ImageUpload
                                src={file.localPath}
                                progress={file.percentage}
                            />
                        )
                    }

                    if(file.type.includes('application')){
                        return (
                            <FileUploadView
                                name={file.name}
                                size={file.size}
                                progress={file.percentage}
                            />
                        )
                    }
                })
            }
            <div ref={messagesEndRef} />
        </>
    )
}

const ChattingView = () => {

    const [ chattingUser, setChattingUser ] = useState<User>();

    const currentChatId = useSelector((state: any) => state.messages.currentThreadId);
    const currentDesUser = useSelector((state: any) => state.messages.currentDesUser);

    useEffect(() => {
        if(currentDesUser){
            setChattingUser(new User(currentDesUser));
        }
    }, [currentDesUser]);

    return (
        <Container>
            <ThreadList />
            <ChatView>
                <ChatViewHeader>
                {
                    chattingUser &&
                    <>
                        <Horizontal>
                            <Avatar
                                src={chattingUser.photoURL}
                                size={44}
                            />
                            <span style={{marginLeft: 8}}>{chattingUser.displayName}</span>
                        </Horizontal>
                        <IconButton>
                            <DeleteIcon sx={{color: '#277be8'}}/>
                        </IconButton>
                    </>
                }
                </ChatViewHeader>
                <ChatViewBody>
                    <MessageList chatId={currentChatId}/>
                </ChatViewBody>
                <ChatViewFooter>
                    <MessageInput />
                </ChatViewFooter>
            </ChatView>
        </Container>
    )
}

export default ChattingView;