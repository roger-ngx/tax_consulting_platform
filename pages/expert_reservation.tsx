
import { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Grid, Paper, styled, Tab, Tabs, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import PriceCard from '../blocks/expert/PriceCard';
import ProfileHeader from '../blocks/expert/ProfileHeader';
import ServiceButtons from '../blocks/expert/ServiceButtons';
import ShowMoreButton from '../elements/ShowMoreButton';
import InfoCard from '../elements/InfoCard';
import ContactInfo from '../blocks/expert/ContactInfo';
import ServiceLocation from '../blocks/expert/ServiceLocation';
import ExpertiseDetail from '../blocks/expert/ExpertiseDetail';
import Link from 'next/link';
import ServiceReview from '../blocks/expert/ServiceReview';
import PriceRadioButton from '../blocks/expert/PriceRadioButton';
import GradientButton from '../elements/GradientButton';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
})

const UnWrapHorizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 20
})

const Info = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    border: 'solid 1px #eee',
    borderTopWidth: 0,
    padding: '20px 0',
    marginBottom: 20
})

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column',
})

const Group = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20
})

const ExpertServiceReservation = () => {

    const [ selectedTab, setSelectedTab ] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleTabChange = (event: Event, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Container>
            <Breadcrumbs separator=">" aria-label="breadcrumb" style={{marginBottom: 24}}>
                <Link
                    // underline="hover"
                    // color="inherit"
                    href="/"
                >
                    Find Expert
                </Link>
                <Link
                    // underline="hover"
                    // color="inherit"
                    href="/expert_detail"
                >
                    Expert Profile
                </Link>
                <span>
                    Expert Reservation
                </span>
            </Breadcrumbs>

            <Column>
                <ProfileHeader />
                <UnWrapHorizontal>
                    <PriceRadioButton
                        type='Basic consultant'
                        matching={20}
                        detail='Solve difficult tax returns at once give!'
                        price='$50/hr'
                        containerStyle={{marginRight: 20}}
                    />
                    <PriceRadioButton
                        type='Basic consultant'
                        matching={20}
                        detail='Solve difficult tax returns at once give!'
                        price='$50/hr'
                        containerStyle={{marginRight: 20}}
                    />
                    <PriceRadioButton
                        type='Basic consultant'
                        matching={20}
                        detail='Solve difficult tax returns at once give!'
                        price='$50/hr'
                    />
                </UnWrapHorizontal>
                <Group>
                    <Horizontal>
                        <Column style={{marginRight: 32}}>
                            <Horizontal style={{marginBottom: 4}}>
                                <EventAvailableIcon style={{marginRight: 4}}/>
                                <span>Date</span>
                            </Horizontal>
                            <Paper>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        value={selectedDate}
                                        onChange={(date: any) => setSelectedDate(date)}
                                        openTo="day"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Paper>
                        </Column>
                        <Column>
                            <Horizontal style={{marginBottom: 4}}>
                                <AccessTimeIcon style={{marginRight: 4}}/>
                                <span>Time</span>
                            </Horizontal>
                            
                        </Column>
                    </Horizontal>
                </Group>
                <Group>
                    <span style={{marginBottom: 4}}>If you have any questions in advance, please leave them.</span>
                    <TextField
                        rows={4}
                        multiline
                        placeholder='Type any questions'
                    />
                </Group>
                <InfoCard containerStyle={{marginTop: 20}}/>
                <GradientButton
                    text='complete'
                    containerStyle={{marginTop: 20}}
                />
            </Column>
                
        </Container>
    )
}

export default ExpertServiceReservation;