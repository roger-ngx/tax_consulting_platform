import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Tabs, Tab } from '@mui/material';

import Profile from './Profile';
import Service from './Service';
import Price from './Price';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Title = styled('span')({
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24
})

const EnrollExpert = () => {

    const [ selectedTab, setSelectedTab ] = useState('profile');

    const handleTabChange = (event:any, newValue: string) => {
        setSelectedTab(newValue);
    };

    return (
        <Container>
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
        </Container>
    )
}

export default EnrollExpert;