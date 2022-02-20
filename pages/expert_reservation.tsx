
import { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Button, ButtonProps, Grid, Paper, styled, Tab, Tabs, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { map, get, omit, filter } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';

import ProfileHeader from '../blocks/expert/ProfileHeader';
import InfoCard from '../elements/InfoCard';
import PriceRadioButton from '../blocks/expert/PriceRadioButton';
import GradientButton from '../elements/GradientButton';
import TimePicker from '../elements/TimePicker';
import { completeResevation } from '../firebase/reservation';
import { setOpenLoginModal } from '../stores/userInfoSlide';

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

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: any) => state.firebase.auth)

    
    const [ question, setQuestion ] = useState();
    const [ selectedPriceIndex, setSelectedPriceIndex ] = useState(0);
    const [ selectedDate, setSelectedDate] = useState(new Date());
    const [ selectedTime, setSelectedTime ] = useState<string>();

    const [ reserved, setReserved ] = useState<string[]>();

    const [ processing, setProcessing ] = useState(false);
    
    const expert = useSelector((state: any) => get(state, `firestore.data.experts[${router.query.id}]`)) || {};
    
    const { price, reservedTimes } = expert;
    
    useEffect(() => {
        const times = filter(reservedTimes, reservedTime => convertTime(dayjs(reservedTime.seconds * 1000)) === convertTime(dayjs(selectedDate)));
        setReserved(map(times, time => dayjs(time.seconds * 1000).format('hh:mm').toString()))
    }, [selectedDate]);

    const convertTime = (time: Dayjs) => {
        return time.format('YYYY-MM-DD').toString();
    }

    const doReservation = async () => {
        if(!!user.uid){
            dispatch(setOpenLoginModal(true));
            return;
        }

        setProcessing(true);

        try{
            const reservationTime = selectedDate + ' ' + selectedTime;
            const selectedPrice = price.options[selectedPriceIndex];
    
            await completeResevation({
                user,
                expertId: expert.id,
                question,
                price: selectedPrice,
                reservationTime: dayjs(reservationTime).toDate()
            })
        }catch(ex){
            console.log('doReservation', ex);
        }

        setProcessing(false);
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
                            reserved={reserved}
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
                    processing={processing}
                />
            </Column>
                
        </Container>
    )
}

export default ExpertServiceReservation;