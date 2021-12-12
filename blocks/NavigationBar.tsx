import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const Horizontal = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Anchor = styled.a`
    margin-left: 24px;
    color: #000;
`

const NavigationBar = () => {

    return (
        <Container>
            <Horizontal>
                <img src='/assets/icons/logo.png' style={{height: 24}}/>
                <Link href='/'>
                    <Anchor>Find Expert</Anchor>
                </Link>
                <Link href='/self_tax'>
                    <Anchor>Self Tax</Anchor>
                </Link>
                <Link href='/'>
                    <Anchor>Contents</Anchor>
                </Link>
            </Horizontal>
            <Horizontal>
                <Link href='/messages'>
                    <Anchor>Message</Anchor>
                </Link>
                <Link href='/my_page'>
                    <Anchor>Profile</Anchor>
                </Link>
            </Horizontal>
        </Container>
    )
}

export default NavigationBar;