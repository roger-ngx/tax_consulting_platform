import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Tabs, Tab } from '@mui/material';
import Link from 'next/link';

import Profile from './Profile';
import Service from './Service';
import Price from './Price';
import ReservationItem from '../expert/ReservationItem';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Title = styled('span')({
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24
})

const Reservation = () => {

    const [ selectedTab, setSelectedTab ] = useState('inprogress');

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Container>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="In Progress" value='inprogress'/>
                <Tab label="Completed" value='completed'/>
            </Tabs>
            <div style={{width: '100%', backgroundColor: '#F6F8FB', padding: 24}}>
                {
                    selectedTab === 'inprogress' &&
                    <Column>
                        <ReservationItem
                            date='8.11 (wed)'
                            time='AM 9:00'
                            content='Booked with Jhon.'
                            isFinished={false}
                        />
                    </Column>
                }
                {
                    selectedTab === 'completed' &&
                    <Column>
                        <ReservationItem
                            date='8.11 (wed)'
                            time='AM 9:00'
                            content='Booked with Jhon.'
                            isFinished={true}
                            status='Completed'
                        />
                    </Column>
                }
            </div>
        </Container>
    )
}

export default Reservation;