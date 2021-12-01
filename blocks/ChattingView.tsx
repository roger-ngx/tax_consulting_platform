import React, { useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux'
import { map } from 'lodash';

import MessageThread from '../elements/MessageThread';
import MessageInput from '../elements/MessageInput';
import Avatar from '../elements/Avatar';
import Messages from './Messages';
import { MESSAGE_TYPE, Message } from '../models/Message';
import ChatThread from '../models/ChatThread';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    border: solid 1px #C7C7C7;
`

const ThreadsView = styled.div`
    border-right: solid 1px #C7C7C7;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

const ChatView = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
`

const ChatViewHeader = styled.div`
    padding: 8px;
`

const ChatViewBody = styled.div`
    flex: 1;
    border-top: solid 1px #C7C7C7;
    border-bottom: solid 1px #C7C7C7;
    padding: 8px;
`

const ChatViewFooter = styled.div`
    padding: 8px;
`

const ThreadList = () => {

    useFirestoreConnect([{
        collection: 'chats',
        where: ['users', 'array-contains', 'thanh'],
        storeAs: 'chats',
        orderBy: ['updatedAt', 'desc'],
        limit: 10
    }])

    const chats = map(useSelector(({firestore}) => firestore.ordered.chats), chat => new ChatThread(chat));

    return (
        <ThreadsView>
            {
                map(chats, chat => (
                    <div style={{width: '100%'}}>
                        <MessageThread
                            id={chat.id}
                            name='Jessi'
                            time={chat.time}
                            text={chat.lastMessage}
                            unReadCount={chat.unReadCount}
                        />
                    </div>
                ))
            }
        </ThreadsView>
    )
}

const MessageList = ({chatId}) => {

    if(!chatId) return null;

    console.log('chatId', chatId);

    useFirestoreConnect([{
        collection: 'chats',
        doc: chatId,
        subcollections: [{
            collection: 'messages',
            orderBy: ['createdAt', 'asc'],
        }],
        storeAs: 'messages',
    }])

    const messages = map(useSelector(({firestore}) => firestore.ordered.messages), message => new Message(message));

    return (
        <>
            <Messages
                isMine={false}
                messages={messages}
            />
        </>
    )
}

const ChattingView = () => {

    const currentChatId = useSelector(state => state.messages.currentThreadId);

    return (
        <Container>
            <ThreadList />
            <ChatView>
                <ChatViewHeader>
                    <Avatar
                        src='/assets/images/profile.png'
                        size={44}
                    />
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