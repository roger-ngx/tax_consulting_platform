import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

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

type A = {
    selected?: boolean
}
const Anchor = styled.a<A>`
    margin-left: 24px;
    ;
    cursor: pointer;
    ${props =>  css`font-weight:${props.selected ? '800' : ''}; color: ${props.selected? '#000' : '#888'}`}
`

const NavigationBar = () => {
    const openLoginModal = useSelector((state: any) => state.user.openLoginModal);
    const user = useSelector((state: any) => state.firebase.auth);

    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <Container>
            <Horizontal>
                <img src='/assets/icons/logo.png' style={{height: 24}}/>
                <Link href='/'>
                    <Anchor selected={router.pathname==='/'}>Find Expert</Anchor>
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
                            <Anchor selected={router.pathname==='/messages'}>Message</Anchor>
                        </Link>
                        <Link href='/my_page' passHref>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}}>
                                <Anchor selected={router.pathname==='/my_page'} style={{marginRight: 4}}>My</Anchor>
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