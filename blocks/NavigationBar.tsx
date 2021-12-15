import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Login from '../dialogs/Login';
import Avatar from '../elements/Avatar';
import { useSelector } from 'react-redux';

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
    const [ openLogin, setOpenLogin ] = useState(false);

    const user = useSelector(state => state.firebase.auth)

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
                {
                    user ? 
                    <Link href='/my_page'>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Anchor style={{marginRight: 4}}>My</Anchor>
                            <Avatar
                                src={user.photoURL}
                                size={32}
                            />
                        </div>
                    </Link>
                    :
                    <a onClick={() => setOpenLogin(true)}>
                        <Anchor>Login</Anchor>
                    </a>
                }
            </Horizontal>
            {
                openLogin &&
                <Login
                    open={openLogin}
                    onClose={() => setOpenLogin(false)}
                />
            }
        </Container>
    )
}

export default NavigationBar;