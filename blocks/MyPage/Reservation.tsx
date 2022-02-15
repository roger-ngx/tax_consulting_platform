import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Tabs, Tab } from '@mui/material';
import Link from 'next/link';
import { map } from 'lodash';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

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

type Props = {
    isExpert?: boolean
}

const Reservation: React.FC<Props> = ({isExpert}) => {

    const [ selectedTab, setSelectedTab ] = useState('inprogress');

    const userId = useSelector((state: any) => state.firebase.auth.uid);

    const reservations = useSelector((state: any) => state.firestore.ordered.reservations);

    isExpert ? useFirestoreConnect([{
        collection: 'experts',
        doc: userId,
        subcollections: [{
            collection: 'reservations',
            orderBy: ['createdAt', 'desc'],
        }],
        storeAs: 'reservations',
        orderBy: ['updatedAt', 'desc'],
        limit: 10
    }])
    :
    useFirestoreConnect([{
        collection: 'reservations',
        doc: userId,
        storeAs: 'reservations',
        orderBy: ['updatedAt', 'desc'],
        limit: 10
    }])

    const handleTabChange = (event: any, newValue: string) => {
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
                        {
                            map(reservations, reservation => (
                                <ReservationItem
                                    key={reservation.id}
                                    date='8.11 (wed)'
                                    time='AM 9:00'
                                    content='Booked with Jhon.'
                                    isFinished={false}
                                    containerStyle={{marginBottom: 20}}
                                />
                            ))
                        }
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