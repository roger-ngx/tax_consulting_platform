import React from 'react';
import Image from 'next/image';
import styled, {css} from 'styled-components';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Div = styled.div`
    display: flex;
    position: relative;

    ${
        props => props.size && css`width: ${props.size}px; height: ${props.size}px`
    }
`

const ImageContainer = styled.div`
    border-radius: 50%;
    overflow: hidden;
    width: 100%;
    height: 100%;
    font-size: 0;
`

const Active = styled.div`
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: #5BCB40;
    z-index: 1000;

    ${props=> css`bottom: ${(props.size*0.146 - 6)|0}px; right: ${(props.size*0.146 - 6)|0}px`}
`

const Name = styled.span`
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    margin-top: 4px;
`

type Props = {
    size: number;
    src: string;
    active?: boolean;
    name?: string
}

const Avatar: React.FC<Props> = ({src='/assets/images/profile.png', size, active, name}) => {

    return (
        <Container>
            <Div>
                <ImageContainer size={size}>
                    <Image src={src} width={size} height={size} />
                </ImageContainer>
                {
                    active &&
                    <Active size={size}/>
                }
            </Div>
            {
                name &&
                <Name>{name}</Name>
            }
        </Container>
    )
}

export default Avatar;