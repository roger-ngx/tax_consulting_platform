
import { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Button, ButtonProps, Grid, Paper, styled, Tab, Tabs, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { includes, map, remove, get, omit } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ProfileHeader from '../blocks/expert/ProfileHeader';
import InfoCard from '../elements/InfoCard';
import PriceRadioButton from '../blocks/expert/PriceRadioButton';
import GradientButton from '../elements/GradientButton';
import TimePicker from '../elements/TimePicker';
import Price from '../models/Price';
import { completeResevation } from '../firebase/reservation';

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
    marginTop: 20,
    overflow: 'scroll',
    paddingBottom: 20
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

    const router = useRouter();
    const user = useSelector((state: any) => state.firebase.auth)

    
    const [ question, setQuestion ] = useState();
    const [ selectedPriceIndex, setSelectedPriceIndex ] = useState(0);
    const [ selectedDate, setSelectedDate] = useState(new Date());
    const [ selectedTime, setSelectedTime ] = useState<string>();
    
    const expert = useSelector((state: any) => get(state, `firestore.data.experts[${router.query.id}]`));
    if(!expert) return null;
    
    const { profile, service, price } = expert;

    const doReservation = () => {
        const reservationTime = dayjs(selectedDate).format('YYYY-MM-DD') + ' ' + selectedTime;
        const selectedPrice = omit(price.options[selectedPriceIndex], ['title', 'detail']);

        completeResevation({
            userId: user.uid,
            expertId: expert.id,
            question,
            price: selectedPrice,
            reservationTime: dayjs(reservationTime).toDate()
        })
    }

    return (
        <Container>
            <Breadcrumbs separator=">" aria-label="breadcrumb" style={{marginBottom: 24}}>
                <Link
                    href="/"
                >
                    Find Expert
                </Link>
                <Link
                    href={`/expert_detail?id=${expert.id}`}
                >
                    Expert Profile
                </Link>
                <span>
                    Expert Reservation
                </span>
            </Breadcrumbs>

            <Column>
                <ProfileHeader data={null}/>
                <UnWrapHorizontal>
                    {
                        map(price.options, (option, index:number) => (
                            <PriceRadioButton
                                key={index}
                                price={option}
                                checked={selectedPriceIndex===index}
                                onChange={() => setSelectedPriceIndex(index)}
                                containerStyle={{marginRight: 20, textAlign: 'left', minWidth: 360}}
                            />
                        ))
                    }
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
                                        renderInput={(params: any) => <TextField {...params} />}
                                        minDate={new Date()}
                                    />
                                </LocalizationProvider>
                            </Paper>
                        </Column>
                        <TimePicker
                            onChange={setSelectedTime}
                        />
                    </Horizontal>
                </Group>
                <Group>
                    <span style={{marginBottom: 4}}>If you have any questions in advance, please leave them.</span>
                    <TextField
                        rows={4}
                        multiline
                        placeholder='Type any questions'
                        value={question}
                        onChange={(e:any) => setQuestion(e.target.value)}
                    />
                </Group>
                <InfoCard containerStyle={{marginTop: 20}}/>
                <GradientButton
                    text='complete'
                    containerStyle={{marginTop: 20}}
                    onClick={doReservation}
                />
            </Column>
                
        </Container>
    )
}

export default ExpertServiceReservation;