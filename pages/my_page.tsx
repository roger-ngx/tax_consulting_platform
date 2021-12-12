import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Tabs, Tab } from '@mui/material';

import MyPageSideMenu from '../blocks/MyPage/MyPageSideMenu';
import Profile from '../blocks/MyPage/Profile';
import Service from '../blocks/MyPage/Service';
import Price from '../blocks/MyPage/Price';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row'
})

const Title = styled('span')({
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24
})

const MyPage = () => {

    const [ selectedTab, setSelectedTab ] = useState('profile');

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Container>
            <div>
                <MyPageSideMenu />
            </div>
            <div style={{flex: 1, marginLeft: 24}}>
                <Title>Enroll Expert</Title>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Profile" value='profile'/>
                    <Tab label="Service" value='service'/>
                    <Tab label="Price" value='price'/>
                </Tabs>
                <div style={{width: '100%', backgroundColor: '#F6F8FB', padding: 24}}>
                    {
                        selectedTab === 'profile' &&
                        <Profile />
                    }
                    {
                        selectedTab === 'service' &&
                        <Service />
                    }
                    {
                        selectedTab === 'price' &&
                        <Price />
                    }
                </div>
            </div>
        </Container>
    )
}

export default MyPage;