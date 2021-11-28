import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux'
import { map } from 'lodash';

import MessageThread from '../elements/MessageThread';
import MessageInput from '../elements/MessageInput';
import Avatar from '../elements/Avatar';
import Messages from './Messages';
import { MESSAGE_TYPE } from '../models/Message';

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

    const chats = useSelector(({firestore}) => firestore.ordered.chats);

    return (
        <ThreadsView>
            {
                map(chats, chat => (
                    <div style={{width: '100%'}}>
                        <MessageThread
                            name='Jessi'
                            time='pm 10:00'
                            text='Could you explain about your self please.'
                            unReadCount={1}
                        />
                    </div>
                ))
            }
        </ThreadsView>
    )
}

const MessageList = ({chatId}) => {

    useFirestoreConnect([{
        collection: 'chats',
        doc: chatId,
        subcollections: [{
            collection: 'messages'
        }],
        orderBy: ['updatedAt', 'desc'],
        storeAs: 'messages',
        limit: 10
    }])

    const chat = useSelector(({firestore}) => firestore.ordered.chats);

    console.log(chat);

    return (
        <>
            <Messages
                isMine={false}
                messages={[
                    {
                        time: dayjs('2021-10-22'),
                        text: 'Hello guy',
                        type: MESSAGE_TYPE.TEXT
                    },
                    {
                        time: dayjs('2021-10-22'),
                        text: 'Welcome to my consulting service.',
                        type: MESSAGE_TYPE.TEXT
                    },
                    {
                        time: dayjs('2021-10-22'),
                        text: 'How can I help you ?',
                        type: MESSAGE_TYPE.TEXT
                    }
                ]}
            />

            <Messages
                isMine={true}
                messages={[
                    {
                        time: dayjs('2021-10-22'),
                        text: 'Hello guy',
                        type: MESSAGE_TYPE.TEXT
                    },
                    {
                        time: dayjs('2021-10-22'),
                        text: 'Welcome to my consulting service.',
                        type: MESSAGE_TYPE.TEXT
                    },
                    {
                        time: dayjs('2021-10-22'),
                        text: 'How can I help you ?',
                        type: MESSAGE_TYPE.TEXT
                    }
                ]}
            />
        </>
    )
}

const ChattingView = () => {

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
                    <MessageList chatId='thanhthuowng'/>
                </ChatViewBody>
                <ChatViewFooter>
                    <MessageInput />
                </ChatViewFooter>
            </ChatView>
        </Container>
    )
}

export default ChattingView;