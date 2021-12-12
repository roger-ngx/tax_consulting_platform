import React from 'react';
import { styled } from '@mui/system';

const Container = styled('div')(props => ({
    backgroundColor: props.active ? '#0045D1' : '#EAEDF2',
    padding: '4px 8px',
    borderRadius: 16,
    display: 'inline-block',
    ...props.style
}));

const Text = styled('div')(props => ({
    color: props.active ? 'white' : '#888',
    whiteSpace: 'nowrap'
}));

type Props = {
    text: string;
    active: boolean;
    containerStyle?: object
}

const Tag: React.FC<Props> = ({text, active, containerStyle}) => {

    return (
        <Container active={active} style={containerStyle}>
            <Text active={active}>
                {text}
            </Text>
        </Container>
    )
}

export default Tag;