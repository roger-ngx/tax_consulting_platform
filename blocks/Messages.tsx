import React from 'react';
import styled, { css } from 'styled-components';
import { map } from 'lodash';

import Avatar from '../elements/Avatar';
import Message from '../elements/Message';
import { IMessage } from '../models/Message';

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
    messages: IMessage[];
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
                    map(messages, (message: IMessage) => <div style={{marginBottom: 4}}><Message text={message.text} time={message.time} isMine={isMine}/></div>)
                }
            </MessagesContainer>
        </Container>
    )
}

export default Messages;