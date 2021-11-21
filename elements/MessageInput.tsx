import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    border: solid 1px #C7C7C7;
    padding: 10px;
    border-radius: 4px;
`;

const Button = styled.button`
    border-radius: 4px;
    border: none;
    font-size: 12px;
    font-weight: bold;
    padding: 8px;

    ${
        props => props.active ? 
        css`background-color: #0045D1; color: #fff`
        :
        css`background-color: #DFE2E8; color: #989FAD`
    }
`

const Input = styled.input`
    flex: 1;
    border: none;
    border-radius: 4px;
    outline: none;
`

type Props = {
    active: boolean
}

const MessageInput: React.FC<Props> = ({active}) => {

    return (
        <Container>
            <Input 
                placeholder='Type a message'
            />
            <Button active={active}>
                Send
            </Button>
        </Container>
    )
}

export default MessageInput;