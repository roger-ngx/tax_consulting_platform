import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { throttle, size } from 'lodash';
import { addMessage, uploadFile } from '../firebase/messageController';
import { useDispatch } from 'react-redux';

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

const FileInput = styled.input`
    display: none;
`

const MessageInput = () => {

    const [ message, setMessage ] = useState();
    const [ active, setActive ] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(size(message)){
            setActive(true);
        }
    }, [message]);

    const sendMessage = async () => {
        try{
            await addMessage({srcUserId: 'thanh', desUserId: 'thuowng', message});
        }catch(ex){
            console.log(ex)
        }
    }

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        console.log(file);
        uploadFile({file, srcUserId: 'thanh', desUserId: 'thuowng', dispatch});
    }

    return (
        <Container>
            <Input 
                placeholder='Type a message'
                value={message}
                onChange={throttle(onChangeText, 50, { trailing: false })}
            />
            <label htmlFor='icon-button-file'>
                <FileInput
                    accept="image/png,image/jpg,.pdf,.doc"
                    id='icon-button-file'
                    type='file'
                    onChange={onFileChange}
                />
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <AttachFileIcon />
                </IconButton>
            </label>
            <Button
                active={active}
                onClick={throttle(sendMessage, 1000, { trailing: false })}
            >
                Send
            </Button>
        </Container>
    )
}

export default MessageInput;