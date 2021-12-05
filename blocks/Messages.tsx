import React from 'react';
import styled, { css } from 'styled-components';
import { map } from 'lodash';

import Avatar from '../elements/Avatar';
import MessageView from '../elements/Message';
import { Message } from '../models/Message';

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const MessagesContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    margin-bottom: 4px;

    ${
        props => props.isMine && css`justify-content: flex-end;`
    }
`

type Props = {
    messages: Message[];
    isMine: boolean;
}

const Messages: React.FC<Props> = ({messages, isMine}) => {

    return (
        <Container>
            {
                !isMine &&
                <Avatar src='/assets/images/profile.png' size={32}/>
            }
            <MessagesContainer isMine={isMine}>
                {
                    map(messages, (message: Message) => (
                        <div style={{marginBottom: 4}}>
                            <MessageView
                                text={message.text}
                                time={message.time}
                                isMine={isMine}
                            />
                        </div>
                    ))
                }
            </MessagesContainer>
        </Container>
    )
}

export default Messages;