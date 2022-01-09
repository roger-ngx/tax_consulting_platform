import React, { useState } from 'react';
import { styled } from '@mui/system';
import { TextField } from '@mui/material';
import { throttle } from 'lodash';

const Component = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Counter = styled('span')({
    fontSize: 12,
    color: '#797979',
    marginTop: 4,
    alignSelf: 'flex-end'
})

const Title = styled('span')({
    marginBottom: 4,
    fontWeight: 'bold'
})

type Props = {
    title?: string,
    placeholder?: string,
    value?: string,
    onChange?: (value: string) => void,
    maxLength: number
}

const TextArea: React.FC<Props> = ({title, placeholder, value='', onChange, maxLength=250}) => {

    const onTextChanged = (e) => {
        if(!onChange){
            return;
        }
        const text = e.target.value;
        onChange(text);
    }

    return (
        <Component>
            <Title>
                {title}
            </Title>
            <TextField
                variant='outlined'
                style={{width: '100%'}}
                multiline
                rows={5}
                value={value}
                onChange={throttle(onTextChanged, 200, {trailing: false})}
                placeholder={placeholder}
                inputProps={{maxLength}}
            />
            <Counter>
                {value.length}/{maxLength}
            </Counter>
        </Component>
    )
}

export default TextArea;