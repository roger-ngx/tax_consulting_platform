import React from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';

const Container = styled.div`
    border-radius: 50%;
    overflow: hidden;

    ${
        props => props.size && css`width: ${props.size}px; height: ${props.size}px`
    }
`

type Props = {
    size: number;
    src: string
}

const Avatar: React.FC<Props> = ({src, size}) => {

    return (
        <Container size={size}>
            <Image src={src} width={size} height={size} />
        </Container>
    )
}

export default Avatar;