import React from 'react';
import { styled } from '@mui/system';

const Container = styled('div')(props => ({
    backgroundColor: props.active ? '#414854' : '#EAEDF2',
    padding: '24px 40px',
    display: 'inline-block',
}));

const Text = styled('div')(props => ({
    color: props.active ? 'white' : '#9B9B9B',
    position: 'relative'
}));

const Index = styled('div')(props => ({
    backgroundColor: props.active ? 'white' : '#414854',
    color: props.active ? '#414854' : 'white',
    position: 'absolute',
    top: -18, left: -18,
    width: 18, height: 18,
    textAlign: 'center',
    borderRadius: 2
}))

type Props = {
    text: string;
    active: boolean;
    index: number;
}



const TabHeader: React.FC<Props> = ({text, active, index}) => {

    return (
        <Container active={active}>
            <Text active={active}>
                {text}
                <Index active={active}>
                    {index}
                </Index>
            </Text>
        </Container>
    )
}

export default TabHeader;