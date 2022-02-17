import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import Login from '../dialogs/Login';
import Avatar from '../elements/Avatar';
import { setOpenLoginModal } from '../stores/userInfoSlide';

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
    cursor: pointer;
`

const NavigationBar = () => {
    const openLoginModal = useSelector((state: any) => state.user.openLoginModal);
    const user = useSelector((state: any) => state.firebase.auth);

    const dispatch = useDispatch();

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
                {
                    user!.isEmpty ? 
                    <a onClick={() => dispatch(setOpenLoginModal(true))}>
                        <Anchor>Login</Anchor>
                    </a>
                    :
                    <>
                        <Link href='/messages'>
                            <Anchor>Message</Anchor>
                        </Link>
                        <Link href='/my_page'>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Anchor style={{marginRight: 4}}>My</Anchor>
                                <Avatar
                                    src={user.photoURL}
                                    size={32}
                                />
                            </div>
                        </Link>
                    </>
                }
            </Horizontal>
            {
                openLoginModal &&
                <Login
                    open={openLoginModal}
                />
            }
        </Container>
    )
}

export default NavigationBar;