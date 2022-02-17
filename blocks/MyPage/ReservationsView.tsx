import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Tabs, Tab } from '@mui/material';
import Link from 'next/link';
import { map, filter } from 'lodash';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import ReservationItem from '../expert/ReservationItem';
import { Reservation, RESERVATION_STATUS } from '../../models/Reservation';

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

const enum TABS {
    IN_PROGRESS,
    COMPLETED
}

type Props = {
    isExpert?: boolean
}

const ReservationsView: React.FC<Props> = ({isExpert}) => {

    const [ selectedTab, setSelectedTab ] = useState(TABS.IN_PROGRESS);
    const [ selectedReservations, setSelectedReservations ] = useState<Reservation[]>([]);

    const userId = useSelector((state: any) => state.firebase.auth.uid);

    const reservations = map(useSelector((state: any) => state.firestore.ordered.reservations), data => new Reservation(data));

    useEffect(() => {
        if(selectedTab === TABS.IN_PROGRESS){
            setSelectedReservations(
                filter(reservations, reservation => [RESERVATION_STATUS.REQUEST, RESERVATION_STATUS.APPROVE, RESERVATION_STATUS.PROGRESS].includes(reservation.status))
            )
        }else{
            setSelectedReservations(
                filter(reservations, reservation => [RESERVATION_STATUS.COMPLETE, RESERVATION_STATUS.CANCEL].includes(reservation.status))
            )
        }
    }, [selectedTab]);

    if(!userId){
        return null;
    }

    isExpert ? useFirestoreConnect([{
        collection: 'experts',
        doc: userId,
        subcollections: [{
            collection: 'reservations',
            orderBy: ['createdAt', 'desc'],
        }],
        storeAs: 'reservations',
        orderBy: ['updatedAt', 'desc']
    }])
    :
    useFirestoreConnect([{
        collection: 'reservations',
        doc: userId,
        subcollections: [{
            collection: 'items',
            orderBy: ['updatedAt', 'desc'],
        }],
        storeAs: 'reservations',
    }])

    const handleTabChange = (event: any, newValue: TABS) => {
        setSelectedTab(newValue);
    };

    return (
        <Container>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="In Progress" value={TABS.IN_PROGRESS}/>
                <Tab label="Completed" value={TABS.COMPLETED}/>
            </Tabs>
            <div style={{width: '100%', backgroundColor: '#F6F8FB', padding: 24}}>
                <Column>
                    {
                        map(selectedReservations, reservation => (
                            <ReservationItem
                                key={reservation.id}
                                isExpert={isExpert}
                                item={reservation}
                                containerStyle={{marginBottom: 20}}
                            />
                        ))
                    }
                </Column>
            </div>
        </Container>
    )
}

export default ReservationsView;