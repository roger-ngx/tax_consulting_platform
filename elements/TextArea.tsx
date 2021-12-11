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
    marginBottom: 4
})

const TextArea = ({title, placeholder, value='', onChange}) => {

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
                onChange={onChange && throttle(onChange, 200, {trailing: false})}
                placeholder={placeholder}
            />
            <Counter>
                {value.length}/250
            </Counter>
        </Component>
    )
}

export default TextArea;