import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Anchor = styled.a`
    margin-left: 24px;
    color: #000;
`

const NavigationBar = () => {

    return (
        <Container>
            <img src='/assets/icons/logo.png' style={{height: 24}}/>
            <Link href='/'>
                <Anchor>Find Expert</Anchor>
            </Link>
            <Link href='/'>
                <Anchor>Self Tax</Anchor>
            </Link>
            <Link href='/'>
                <Anchor>Contents</Anchor>
            </Link>
        </Container>
    )
}

export default NavigationBar;